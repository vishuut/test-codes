package com.maxlife.portal.awe.portlet.portlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.servlet.http.HttpServletRequest;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;

import com.liferay.counter.kernel.service.CounterLocalServiceUtil;
import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.WebKeys;
import com.maxlife.portal.awe.config.AWEConfiguration;
import com.maxlife.portal.awe.portlet.constants.AWEPortletKeys;
import com.maxlife.portal.exception.NoSuchMorningHuddleException;
import com.maxlife.portal.model.AWEUserMaster;
import com.maxlife.portal.model.MorningHuddle;
import com.maxlife.portal.service.AWEUserMasterLocalServiceUtil;
import com.maxlife.portal.service.MorningHuddleLocalService;
import com.maxlife.portal.service.persistence.MorningHuddleUtil;

@Component(configurationPid = {
        "com.maxlife.portal.awe.config.AWEConfiguration" },
        immediate = true, property = { "com.liferay.portlet.display-category=Awe Workflow",
        "com.liferay.portlet.header-portlet-css=/css/main.css", "com.liferay.portlet.instanceable=true",
        "javax.portlet.display-name=AWE", "javax.portlet.init-param.template-path=/",
        "javax.portlet.init-param.view-template=/view.jsp", "javax.portlet.name=" + AWEPortletKeys.AWE,
        "javax.portlet.resource-bundle=content.Language",
        "javax.portlet.security-role-ref=power-user,user" }, service = Portlet.class)
public class AWEPortlet extends MVCPortlet {

    private static final Log logger = LogFactoryUtil.getLog(AWEPortlet.class.getName());
    @Reference
    public MorningHuddleLocalService _morningHuddleService;
    
    private volatile AWEConfiguration aweConfiguration;
    
    private static final String STATUS_INITIATED="initiated";
    private static final String STATUS_DRAFT="draft";
    private static final String STATUS_SUBMITTED="submitted";

    
    @Activate
    @Modified
    protected void activate(Map<String, Object> properties) {
        aweConfiguration = ConfigurableUtil.createConfigurable(AWEConfiguration.class,
                properties);
    }
    
    @Override

    public void doView(RenderRequest renderRequest, RenderResponse renderResponse)
            throws IOException, PortletException {

        String loadJspPage = "";
        String branchName = "xyz";
        String circle = "xyz";
        String region = "xyz";
        String solId = "1234";
        String branchCode = "xyz";

        String userType = "RA";

        // String userType = "CVR";
        // String userType = "BVR";

        String bvrAndCvrFormId = "";
        String bvrAndCvrFormstatus = "";
        List<AWEUserMaster> aweUserMasters = null;

        User currentUser = ((ThemeDisplay) renderRequest.getAttribute(WebKeys.THEME_DISPLAY)).getUser();
        
        Map<String, String> userDetails = getUserDetailsFromApi(currentUser.getScreenName());
        List<String> branchSolIds = null;
        if(userDetails != null && !userDetails.isEmpty() && userDetails.get("agentId") != null && !userDetails.get("agentId").isEmpty()) {
            branchSolIds = getAgentBranchSolIds(userDetails.get("agentId"));
        }
        
        String userRole = "";
        logger.info("role codes: " + aweConfiguration.raRoleCodes());
        if(userDetails != null && !userDetails.isEmpty() && userDetails.get("roleCode") != null && !userDetails.get("roleCode").isEmpty()) {
            if(aweConfiguration.raRoleCodes().contains(userDetails.get("roleCode")))
                userRole = "RA";
            else if(aweConfiguration.cmRoleCodes().contains(userDetails.get("roleCode")))
                userRole = "Cluster Manager";
            else if(aweConfiguration.crmRoleCodes().contains(userDetails.get("roleCode")))
                userRole = "Circle Relationship Manager";
        }

        if (!userRole.isEmpty() && "RA".equalsIgnoreCase(userRole)) {
            HttpServletRequest httpReq = PortalUtil.getOriginalServletRequest(PortalUtil.getHttpServletRequest(renderRequest));
            String choosenBranch = httpReq.getParameter("branchSolId");
            String currentUrl = PortalUtil.getCurrentCompleteURL(PortalUtil.getHttpServletRequest(renderRequest));
            int indexOfQsnMark = currentUrl.indexOf("?");
            if(indexOfQsnMark != -1) {
                currentUrl = currentUrl.substring(0, indexOfQsnMark);
                logger.info("current url " + currentUrl);
            }
            logger.info("branch sol id choosen : " + choosenBranch);
            MorningHuddle todaysMorningHuddle = null;
            if(branchSolIds != null && !branchSolIds.isEmpty())
                todaysMorningHuddle = findOrInititlizeTodaysMorningHuddle(currentUser, choosenBranch, branchSolIds.get(0));
            renderRequest.setAttribute("typeOfUser", userRole);
            renderRequest.setAttribute("branchSolIds", branchSolIds);
            renderRequest.setAttribute("currentUser", currentUser);
            renderRequest.setAttribute("todaysMorningHuddle", todaysMorningHuddle);
            renderRequest.setAttribute("currentUrl", currentUrl);
            loadJspPage = "/view.jsp";
        } else if (!userRole.isEmpty() && "Circle Relationship Manager".equalsIgnoreCase(userRole)) {

            aweUserMasters = createOrFindBvrAndCvrFormId(currentUser, "cvr", userRole, branchCode, branchName, circle,
                    region, solId);
            bvrAndCvrFormId = String.valueOf(aweUserMasters.get(0).getAweUserMasterId());
            bvrAndCvrFormstatus = aweUserMasters.get(0).getFormStatus();

            renderRequest.setAttribute("formType", "cvr");
            renderRequest.setAttribute("formId", bvrAndCvrFormId);
            renderRequest.setAttribute("formstatus", bvrAndCvrFormstatus);

            loadJspPage = "/jsp/agreementvector.jsp";

        } else if (!userRole.isEmpty() && "Cluster Manager".equalsIgnoreCase(userRole)) {

            aweUserMasters = createOrFindBvrAndCvrFormId(currentUser, "bvr", userRole, branchCode, branchName, circle,
                    region, solId);
            bvrAndCvrFormId = String.valueOf(aweUserMasters.get(0).getAweUserMasterId());
            bvrAndCvrFormstatus = aweUserMasters.get(0).getFormStatus();

            renderRequest.setAttribute("formType", "bvr");
            renderRequest.setAttribute("formId", bvrAndCvrFormId);
            renderRequest.setAttribute("formstatus", bvrAndCvrFormstatus);

            loadJspPage = "/jsp/agreementvector.jsp";
        }else {
            loadJspPage = "/view.jsp";
        }

        try {
            super.include(loadJspPage, renderRequest, renderResponse);
        } catch (IOException | PortletException e) {
            logger.error(e);
        }
    }

    private MorningHuddle findOrInititlizeTodaysMorningHuddle(User currentUser, String choosenBranchSolId, String firstBranchSolId) {

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        // formating to remove the time from date
        Date todayDate = null;
        try {
            todayDate = sdf.parse(sdf.format(new Date()));
        } catch (ParseException e1) {
            logger.error("Error while parsing date.");
        }

        MorningHuddle todaysMorningHuddle = null;
        
        if(choosenBranchSolId != null) {
            try {
                todaysMorningHuddle = _morningHuddleService.findByBranchSolIdUserIdCreateDate(choosenBranchSolId, currentUser.getUserId(), todayDate);
            } catch (NullPointerException | NoSuchMorningHuddleException e) {
                logger.error("Cannot find any existing Morning Huddle for " + currentUser.getScreenName());
            }
            
            if (todaysMorningHuddle != null) {
                return todaysMorningHuddle;
            } else {
                todaysMorningHuddle = MorningHuddleUtil
                        .create(CounterLocalServiceUtil.increment(MorningHuddle.class.getName()));
                todaysMorningHuddle.setBranchSolId(choosenBranchSolId);
                todaysMorningHuddle.setCreateDate(todayDate);
                todaysMorningHuddle.setModifiedDate(todayDate);
                todaysMorningHuddle.setUserId(currentUser.getUserId());
                todaysMorningHuddle.setGroupId(currentUser.getGroupId());
                todaysMorningHuddle.setUserName(currentUser.getScreenName());
                todaysMorningHuddle.setStatus(STATUS_INITIATED);
                _morningHuddleService.addMorningHuddle(todaysMorningHuddle);
            }
            
        }else {
            try {
                List<MorningHuddle> huddles = _morningHuddleService.findByUserIdAndCreateDate(currentUser.getUserId(), todayDate);
                List<MorningHuddle> draftHuddle = new ArrayList<MorningHuddle>();
                List<MorningHuddle> submittedHuddle = new ArrayList<MorningHuddle>();
                List<MorningHuddle> initiatedHuddle = new ArrayList<MorningHuddle>();
                
                if(huddles != null && !huddles.isEmpty()) {
                    for(MorningHuddle mh : huddles) {
                        if(mh.getStatus().equals(STATUS_DRAFT)) {
                            draftHuddle.add(mh);
                        }else if(mh.getStatus().equals(STATUS_SUBMITTED)) {
                            submittedHuddle.add(mh);
                        }else {
                            initiatedHuddle.add(mh);
                        }
                    }
                }
                
                if(!draftHuddle.isEmpty()) {
                    todaysMorningHuddle = draftHuddle.get(0);
                }else if(!initiatedHuddle.isEmpty()) {
                    todaysMorningHuddle = initiatedHuddle.get(0);
                }else if(!submittedHuddle.isEmpty()) {
                    todaysMorningHuddle = submittedHuddle.get(0);
                }else if(huddles != null && !huddles.isEmpty()) {
                    todaysMorningHuddle = huddles.get(0);
                }
                
            } catch (NullPointerException | NoSuchMorningHuddleException e) {
                logger.error("Cannot find any existing Morning Huddle for " + currentUser.getScreenName());
            }
            
            if (todaysMorningHuddle == null) {
                todaysMorningHuddle = MorningHuddleUtil.create(CounterLocalServiceUtil.increment(MorningHuddle.class.getName()));
                todaysMorningHuddle.setBranchSolId(firstBranchSolId);
                todaysMorningHuddle.setCreateDate(todayDate);
                todaysMorningHuddle.setModifiedDate(todayDate);
                todaysMorningHuddle.setUserId(currentUser.getUserId());
                todaysMorningHuddle.setGroupId(currentUser.getGroupId());
                todaysMorningHuddle.setUserName(currentUser.getScreenName());
                todaysMorningHuddle.setStatus(STATUS_INITIATED);
                _morningHuddleService.addMorningHuddle(todaysMorningHuddle);
            }
            
        }
        
        return todaysMorningHuddle;
    }

    private List<AWEUserMaster> createOrFindBvrAndCvrFormId(User currentUser, String formType, String userRole,
            String branchCode, String branchName, String circle, String region, String solId) {

        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        int monthNumber = cal.get(Calendar.MONTH) + 1;
        int year = cal.get(Calendar.YEAR);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        // formating to remove the time from date
        Date todayDate = null;
        try {
            todayDate = sdf.parse(sdf.format(new Date()));
        } catch (ParseException e1) {
            logger.error("Error while parsing date.");
        }

        List<AWEUserMaster> aweUserMasters = null;
        AWEUserMaster aweUserMaster = null;

        aweUserMasters = AWEUserMasterLocalServiceUtil
                .findByAweUserMasterSsoIdFormTypeMonthAndYear(currentUser.getScreenName(), formType, monthNumber, year);

        if (aweUserMasters.isEmpty()) {
            aweUserMaster = AWEUserMasterLocalServiceUtil.createAWEUserMaster(CounterLocalServiceUtil.increment());
            aweUserMaster.setUserSsoId(currentUser.getScreenName());
            aweUserMaster.setUserRole(userRole);
            aweUserMaster.setSolId(solId);
            aweUserMaster.setBranchCode(branchCode);
            aweUserMaster.setBranchName(branchName);
            aweUserMaster.setCircle(circle);
            aweUserMaster.setRegion(region);
            aweUserMaster.setFormType(formType);
            aweUserMaster.setFormCreateDate(todayDate);
            aweUserMaster.setMonthNumber(monthNumber);
            aweUserMaster.setYear(year);
            aweUserMaster.setGroupId(currentUser.getGroupId());
            aweUserMaster.setCompanyId(currentUser.getCompanyId());
            aweUserMaster.setCreatedBy(currentUser.getUserId());
            aweUserMaster.setUserName(currentUser.getFullName());
            aweUserMaster.setCreateDate(new Date());
            AWEUserMasterLocalServiceUtil.addAWEUserMaster(aweUserMaster);

            aweUserMasters = AWEUserMasterLocalServiceUtil.findByAweUserMasterSsoIdFormTypeMonthAndYear(
                    currentUser.getScreenName(), formType, monthNumber, year);
        }

        return aweUserMasters;
    }
    
    private Map<String, String> getUserDetailsFromApi(String ssoId) throws IOException {
        // need to comment below line after testing
        // ssoId = "jgccn0847";
        
        Map<String, String> userDetails = null;
        
        String url = "https://mligateway.maxlifeinsurance.com/mli/prod/soa/ssogetuserdetails/v1";
        String requestString = "{" + 
                "  \"request\": {" + 
                "    \"header\": {" + 
                "      \"soaCorrelationId\": \"pjQ81lA197\"," + 
                "      \"soaMsgVersion\": \"1.0\"," + 
                "      \"soaAppId\": \"EmpApp\"" + 
                "    }," + 
                "    \"requestData\": {" + 
                "      \"requestPayload\": {" + 
                "        \"transactions\": [" + 
                "          {" + 
                "            \"ssoId\": \"\"" + 
                "          }" + 
                "        ]" + 
                "      }" + 
                "    }" + 
                "  }" + 
                "}";
        
        URL urlObj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) urlObj.openConnection();
        
        try {
            con.setRequestMethod("POST");
            con.setReadTimeout(10000);
            con.setDoOutput(true);
            
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("X-IBM-Client-Id", "6be76630-97f4-42fa-8f5a-4943e71a8f86");
            con.setRequestProperty("X-IBM-Client-Secret", "qG4aE5eS5kA5dG3aD2jG3nM4pM7iU7lV5mG1yT0iV4jL1nQ8rH");
            
            JSONObject requestParamJson = JSONFactoryUtil.createJSONObject(requestString);
            requestParamJson.getJSONObject("request")
                            .getJSONObject("requestData")
                            .getJSONObject("requestPayload")
                            .getJSONArray("transactions").getJSONObject(0).put("ssoId", ssoId);
            
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = requestParamJson.toJSONString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);           
            }
            
            String apiResponse = "";
            
            try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                apiResponse = response.toString();
            }
            
            JSONObject responseJson = JSONFactoryUtil.createJSONObject(apiResponse);
            JSONObject transactionAt0 = responseJson.getJSONObject("response")
                                            .getJSONObject("responseData")
                                            .getJSONArray("Transactions")
                                            .getJSONObject(0);
            
            userDetails = new HashMap<>();
            userDetails.put("roleCode", transactionAt0.getString("mnylmyagentrolecode"));
            userDetails.put("agentId", transactionAt0.getString("mnylagentcode"));
            
            logger.info(userDetails);
        
        } catch (Exception e) {
            logger.error("Unable to get user details from userdetails api: " + e.getCause() + " = " + e.getMessage());
        }finally {
            con.disconnect();
        }
        
        return userDetails;
        
    }
    
    private List<String> getAgentBranchSolIds(String agentId) throws IOException {
        
        List<String> branchSolIds = null;
        
        // need to comment below line after testing
        // agentId = "973578";

        String url = "https://mligateway.maxlifeinsurance.com/mli/prod/soa/dm/salesmanagement/agent360/v2";
        String requestString = "{" + 
                "   \"request\": {" + 
                "      \"header\": {" + 
                "         \"soaCorrelationId\": \"1234567890\"," + 
                "         \"soaAppId\": \"MPOWER\"" + 
                "      }," + 
                "      \"payload\": {" + 
                "         \"agentId\": \"\"," + 
                "         \"services\": [" + 
                "            {" + 
                "               \"serviceName\": \"agtBsDtlType\"" + 
                "            }" + 
                "         ]" + 
                "      }" + 
                "   }" + 
                "}";

        URL urlObj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) urlObj.openConnection();

        try {
            con.setRequestMethod("POST");
            con.setReadTimeout(10000);
            con.setDoOutput(true);

            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("X-IBM-Client-Id", "6be76630-97f4-42fa-8f5a-4943e71a8f86");
            con.setRequestProperty("X-IBM-Client-Secret", "qG4aE5eS5kA5dG3aD2jG3nM4pM7iU7lV5mG1yT0iV4jL1nQ8rH");

            JSONObject requestParamJson = JSONFactoryUtil.createJSONObject(requestString);
            requestParamJson.getJSONObject("request").getJSONObject("payload").put("agentId", agentId);

            try (OutputStream os = con.getOutputStream()) {
                byte[] input = requestParamJson.toJSONString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            String apiResponse = "";

            try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                apiResponse = response.toString();
                logger.info("api response : " + apiResponse);
            }
            

            JSONObject responseJson = JSONFactoryUtil.createJSONObject(apiResponse);
            JSONArray branchSolJsonList = responseJson.getJSONObject("response").getJSONObject("payload").getJSONObject("agtBsDtlType").getJSONArray("secondaryBranchCodeAll");
            
            branchSolIds = new ArrayList<String>();
            
            for(int i = 0; i < branchSolJsonList.length(); i++) {
                branchSolIds.add(branchSolJsonList.getString(i));
            }
            
            logger.info(branchSolIds);

        } catch (Exception e) {
            logger.error("Unable to get user details from userdetails api: " + e.getCause() + " = " + e.getMessage());
        } finally {
            con.disconnect();
        }

        return branchSolIds;

    }
    
    
    
    
    
}