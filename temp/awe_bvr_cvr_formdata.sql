SELECT
	au.userSsoId ,
	au.userRole ,
	au.solId ,
	au.branchName ,
	au.clusterName ,
	au.formType ,
	au.formStatus ,
	au.formCreateDate ,
	au.monthNumber ,
	au.`year` ,
	au.createdBy ,
	au.userName ,
	au.createDate ,
	au.modifiedDate ,
	afd.formSelectDate ,
	afd.meetingDone ,
	afd.topHelpItems ,
	aav.fullSegmentName ,
	aav.staffNumber ,
	aav.activeStaffNumber ,
	aav.policiesRequired ,
	aav.agreedAverageCase ,
	aav.totalWpc ,
	aav.leadsRequired ,
	atb.agreedActivation as total_agreedActivation ,
	atb.proActiveMember as total_proActiveMember ,
	atb.leadsPerResource as total_leadsPerResource,
	atb.staffNumber as total_staffNumber ,
	atb.activeStaffNumber as total_activeStaffNumber ,
	atb.policiesRequired as total_policiesRequired ,
	atb.agreedAverageCase as total_agreedAverageCase ,
	atb.totalWpc as total_totalWpc ,
	atb.leadsRequired as total_leadsRequired ,
	atb.agreedActivation as total_agreedActivation ,
	atb.proActiveMember as total_proActiveMember ,
	atb.leadsPerResource as total_leadsPerResource ,
	aac.what ,
	aac.how ,
	aqv.qualityVector ,
	aqv.currentState ,
	aqv.currentStateComment ,
	aqv.desiredState ,
	aqv.desiredStateComment ,
	arr.raId ,
	arr.raName ,
	arr.Punctuality ,
	arr.productKnowledge ,
	arr.understandingOfOpsProcess ,
	arr.followUpOnLeads ,
	arr.ratingAvearge 
FROM
	awe_usermaster au
LEFT JOIN
	awe_formdetail afd
ON
	au.aweUserMasterId = afd.aweUserMasterId
LEFT JOIN
	awe_agreementvector aav
ON 
	au.aweUserMasterId = aav.aweUserMasterId
LEFT JOIN
	awe_totalbranch atb 
ON 
	au.aweUserMasterId = atb.aweUserMasterId
LEFT JOIN
	awe_agreedactionable aac 
ON
	au.aweUserMasterId = aac.aweUserMasterId 
LEFT JOIN 
	awe_qualityvector aqv 
ON 
	au.aweUserMasterId = aqv.aweUserMasterId 
LEFT JOIN 
	awe_rarating arr 
ON 
	au.aweUserMasterId = arr.aweUserMasterId ;