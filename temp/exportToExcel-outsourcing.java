	public void exportToExcel(ResourceRequest resourceRequest, ResourceResponse resourceResponse, List<OWFormContent> formContentList, OneWorkflowTemplate oneWorkflowTemplate) {
		HSSFWorkbook workbook = new HSSFWorkbook();
		CellStyle cs = workbook.createCellStyle();
		cs.setWrapText(true);
	
		try {
			
			HSSFSheet sheet = workbook.createSheet("Sheet");
			sheet.autoSizeColumn(3);
			Cell cell = null;
			int rownum = -1;

			if (templateId != null && !templateId.isEmpty()) {
				
				ObjectMapper mapper = new ObjectMapper();
				int fieldCounter = -1;

				if (formContentList != null && !formContentList.isEmpty()) {
					
					List<FIleDetail> fileDetails = mapper.readValue(formContentList.get(0).getContent(),
							mapper.getTypeFactory().constructCollectionType(List.class, FIleDetail.class));
					
					
					
					// START of adding headers
					Row header = sheet.createRow(++rownum);
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Workitem ID");

					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Creation Date");
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Submition Date");
					
					for (int i = 0; i < fileDetails.size(); i++) {
						if (!"approvers".equalsIgnoreCase(fileDetails.get(i).getType()) && !"Custom script".equalsIgnoreCase(fileDetails.get(i).getLabel())) {
							cell = header.createCell(++fieldCounter);
							cell.setCellValue(fileDetails.get(i).getLabel());
						}
					}
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Contract Status");
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Approver Received Date");
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Approver Approved Date");
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Approver");

					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Approver TAT");
						
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Overall TAT");
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Comments");
					
					cell = header.createCell(++fieldCounter);
					cell.setCellValue("Clarifications");
					
					// END of adding headers
					
					// START of filling data
					log.info("Number of fields: "+fieldCounter);
					
					SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yy");
					SimpleDateFormat sdfText = new SimpleDateFormat("dd/MMM/yyyy");
					
					log.info("form content list size : " + formContentList.size());
										
					for (int i = 0; i < formContentList.size(); i++) {
						
						OWFormContent formContent = formContentList.get(i);
						
						List<OWAction> actions = OWActionLocalServiceUtil.owActionByFormId(formContentList.get(0).getOwformcontentid(), formContentList.get(0).getOneWorkflowTemplateId(), false);
						log.info("actions size : " + actions.size());
						
						List<FIleDetail> formDataList = mapper.readValue(formContent.getContent(), mapper.getTypeFactory().constructCollectionType(List.class, FIleDetail.class));
						
						for (int actionCounter = 0; actionCounter < actions.size(); actionCounter++) {
							OWAction action = actions.get(actionCounter);
							
							log.info("is same version : " + (action.getOwformversionId() == formContent.getOwformversionId()));
							
//							if(action.getOwformversionId() == formContent.getOwformversionId()) {
								fieldCounter = -1;
								Row row = sheet.createRow(++rownum);
	
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(formContent.getName());
								
								Date contractCreationDate = formContent.getCreateDate();
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(sdf.format(contractCreationDate));
								
								Date contractSubmissionDate = formContent.getSubmissionDate();
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(sdf.format(contractSubmissionDate));
								
								for (int j = 0; j < formDataList.size(); j++) {
									
									FIleDetail formData = formDataList.get(j);
									
	//								log.info(formData.getLabel() + " - " + formData.getValue());
									
									if (!"approvers".equalsIgnoreCase(formData.getType()) && !"hidden".equalsIgnoreCase(formData.getType())) {
										
										cell = row.createCell(++fieldCounter);
										
										if (!"linkworkflow".equalsIgnoreCase(formData.getType())) {
											
											String value = null;
											try{
												if(Pattern.matches(".*\\bDate\\b[ ()\\w]*", formData.getLabel()) && !formData.getValue().isEmpty()) {
													value = sdf.format(sdfText.parse(formData.getValue()));
												} else if("custom user".equalsIgnoreCase(formData.getType())) {
													User customUser =  UserLocalServiceUtil.getUserByScreenName(CompanyThreadLocal.getCompanyId(), formData.getValue());
													value = customUser != null ? customUser.getFullName() : "";
												} else {
													value = formData.getValue() == null ? "" : formData.getValue();
												}
											}catch(Exception e) {
												value = "";
											}
											
											switch (value) {
											case "Select":
												value = "";
												break;
											case "":
												value = "";
												break;
											default:
												break;
											}
											cell.setCellValue(value);
											
										}else {
											String workflowid = formDataList.get(j).getValue();
											String[] workflowids = workflowid.split(",");
											String incidentName = "";
											for (int k = 0; k < workflowids.length; k++) {
												if (workflowids[k] != null && !workflowids[k].isEmpty()) {
													incidentName = incidentName + OWFormContentLocalServiceUtil.getOWFormContent(Long.parseLong(workflowids[k])).getName();
													incidentName = incidentName + " ,";
												}
											}
											cell.setCellValue(String.valueOf(incidentName));
										}
										
									}
								}
								
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(formContent.getStatus());
								
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(sdf.format(action.getAssignDate()));
								
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(action.getCompleted() ? sdf.format(action.getModifiedDate()) : "");
								
								User apprvr = UserLocalServiceUtil.getUser(action.getAssignTo());
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(apprvr.getFullName());
								
								Date actionModifiedDate = action.getModifiedDate();
								Date currentDate = new Date();
								Date actionAssignedDate = action.getAssignDate();
								long tat = action.getCompleted() ? (actionModifiedDate.getTime() - actionAssignedDate.getTime()) / (24 * 60 * 60 * 1000) : (currentDate.getTime() - actionAssignedDate.getTime()) / (24 * 60 * 60 * 1000);
								
								Date contractModificationDate = formContent.getModifiedDate(); 
								long overallTat = "pending".equalsIgnoreCase(formContent.getStatus()) ? (currentDate.getTime() - contractSubmissionDate.getTime()) / (24 * 60 * 60 * 1000) : (contractModificationDate.getTime() - contractSubmissionDate.getTime()) / (24 * 60 * 60 * 1000) ;
								
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(tat);
								
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(overallTat);
								
								String comments = "";
								List<OwComments> formComments = OwCommentsLocalServiceUtil.getCommentsByForm(formContent.getOwformcontentid());
								for(OwComments cmnt : formComments) {
									comments += cmnt.getUserName() + " - " + cmnt.getComment() + "\n";
								}
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(comments);
								String clrf = "";
								List<Clarification> clarifications = ClarificationLocalServiceUtil.getClarificationByForm(formContent.getOwformcontentid(), false);
								for (Clarification clarification : clarifications) {
									clrf = clrf + clarification.getUserName() + " - " + clarification.getClarificationQuastion() + "\n";
									List<ClarificationAnswer> answers = ClarificationAnswerLocalServiceUtil.getAnswersByQuestion(clarification.getClarificationId());
									for (ClarificationAnswer clarificationAnswer : answers) {
										clrf = clrf + UserLocalServiceUtil.getUser(clarificationAnswer.getAskedTo()).getFullName()+ " - " + clarificationAnswer.getClarificationAnswer() + "\n";
									}
								}
								cell = row.createCell(++fieldCounter);
								cell.setCellValue(clrf);								
//							}
							
						}
						
					}
					
//					for (int i = 0; i < formContentList.size(); i++) {
//						Row row = sheet.createRow(++rownum);
//						
//						cell = row.createCell(0);
//						cell.setCellValue(formContentList.get(i).getName());
//						
//						cell = row.createCell(1);
//						cell.setCellValue(formContentList.get(i).getCreateDate().toString());
//
//						List<FIleDetail> formDataList = mapper.readValue(formContentList.get(i).getContent(),
//								mapper.getTypeFactory().constructCollectionType(List.class, FIleDetail.class));
//						
//						for (int j = 0; j < formDataList.size(); j++) {
//							if (!"approvers".equalsIgnoreCase(formDataList.get(j).getType()) && !"Custom script".equalsIgnoreCase(formDataList.get(j).getLabel())) {
//								cell = row.createCell(3+j);
//								cell.setCellValue(formDataList.get(j).getValue());
//							}
//							int actionCounter1 = 0;
//							for (int k = 0; k < actions.size(); k++) {
//								User apprvr = UserLocalServiceUtil.getUser(actions.get(k).getAssignTo());
//								cell = row.createCell(3 + fieldCounter + actionCounter1);
//								cell.setCellValue(apprvr.getFullName());
//
//								cell = row.createCell(3 + fieldCounter + actionCounter1 + 1);
//								cell.setCellValue(actions.get(k).getStatus());
//
//								cell = row.createCell(3 + fieldCounter + actionCounter1 + 2);
//								cell.setCellValue(actions.get(k).getModifiedDate().toString());
//								actionCounter1 = actionCounter1 + 3;
//							}
//							cell = row.createCell(3 + fieldCounter + actionCounter1);
//							cell.setCellStyle(cs);
//							String comments = "";
//							List<Clarification> clarifications = ClarificationLocalServiceUtil.getClarificationByForm(formContentList.get(i).getOwformcontentid(),false);
//							for (Clarification clarification : clarifications) {
//								comments = comments +clarification.getUserName()+" - "+clarification.getClarificationQuastion()+"\n";
//								List<ClarificationAnswer> answers = ClarificationAnswerLocalServiceUtil.getAnswersByQuestion(clarification.getClarificationId());
//								for (ClarificationAnswer clarificationAnswer : answers) {
//									comments=comments + UserLocalServiceUtil.getUser(clarificationAnswer.getAskedTo()).getFullName()+" - "+clarificationAnswer.getClarificationAnswer()+"\n";
//								}
//							}
//							cell.setCellValue(comments);
//							
//						}
//						
//					}
				}
				
			}
			resourceResponse.setContentType("application/vnd.ms-excel");
			resourceResponse.addProperty("Content-Disposition",
					"inline; filename=" + oneWorkflowTemplate.getName() + ".xls");
			workbook.write(resourceResponse.getPortletOutputStream());

			resourceResponse.getPortletOutputStream().close();
			super.serveResource(resourceRequest, resourceResponse);
		} catch (IOException | PortletException | NumberFormatException | PortalException e) {
			log.info(e.getCause() + " : " + e.getLocalizedMessage());
		}
	}