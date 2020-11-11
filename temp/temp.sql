create table morning_huddle (
	morningHuddleId BIGINT not null primary key,
	groupId BIGINT,
	companyId BIGINT,
	userId BIGINT,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	branchSolId VARCHAR(75) null,
	huddleAttended VARCHAR(75) null,
	numberOfLeadsExpected INTEGER,
	numberOfCustomerMeetings INTEGER,
	expectedTotalPolicyPremium VARCHAR(75) null,
	customerName VARCHAR(75) null,
	customerId VARCHAR(75) null,
	numberOfNop VARCHAR(75) null
	absenceReason VARCHAR(75) null,
	discriptiveAbsenceReason VARCHAR(75) null,
	status VARCHAR(75) null
);

create table awe_agent_manager_detail (
	agentSsoId VARCHAR(75) not null primary key,
	managerSsoId VARCHAR(75) null,
	managerName VARCHAR(75) null,
	managerEmail VARCHAR(75) null
);

create table fd_employee_address (
	fdEmployeeAddressId BIGINT not null primary key,
	screenName VARCHAR(75) null,
	fullName VARCHAR(75) null,
	empFullAddress VARCHAR(1024) null,
	pictureUrl VARCHAR(1024) null
);


SELECT 
	userName as ssoId,
	fullName,
	createDate,
	branchSolId,
	CASE
		WHEN huddleAttended IS NULL THEN " "
		WHEN huddleAttended = "" THEN " "
		ELSE huddleAttended
	END AS huddleAttended,
	numberOfLeadsExpected,
	numberOfCustomerMeetings,
	CASE
		WHEN expectedTotalPolicyPremium IS NULL THEN " "
		WHEN expectedTotalPolicyPremium = "" THEN " "
		ELSE expectedTotalPolicyPremium
	END AS expectedTotalPolicyPremium,
	CASE
		WHEN customerName IS NULL THEN " "
		WHEN customerName = "" THEN " "
		ELSE customerName
	END AS customerName,
	CASE
		WHEN customerId IS NULL THEN " "
		WHEN customerId = "" THEN " "
		ELSE customerId
	END AS customerId,
	CASE
		WHEN numberOfNop IS NULL THEN " "
		WHEN numberOfNop = "" THEN " "
		ELSE numberOfNop
	END AS numberOfNop,
	CASE
		WHEN absenceReason IS NULL THEN " "
		WHEN absenceReason = "" THEN " "
		ELSE absenceReason
	END AS absenceReason,
	CASE
		WHEN discriptiveAbsenceReason IS NULL THEN " "
		WHEN discriptiveAbsenceReason = "" THEN " "
		ELSE discriptiveAbsenceReason
	END AS discriptiveAbsenceReason,
	status
FROM morning_huddle;






-- for local environment where user table name = user_

SELECT
	aud.userSsoId,
	aud.amlUserName,
	usr_usr.emailAddress AS amlUserEmail,
	aud.userMobileNo,
	CONCAT(usr_mgr.firstName, ' ', usr_mgr.lastName) AS managerName,
	usr_mgr.emailAddress AS managerEmail,
	aud.managerMobileNo,
	aud.assignDate,
	CASE
		WHEN aud.amlQuizzStatus = 2 THEN 'Not Attempted'
		WHEN aud.amlQuizzStatus = 1 THEN 'Pass'
		WHEN aud.amlQuizzStatus = 0 THEN 'Fail'
	END AS quizStatus,
	aqr.percentageAchieved,
	aqr.createDate AS quizAttemptDate,
	qus_data.questionNumber,
	qus_data.question,
	qus_data.userAnswer,
	qus_data.optionId,
	qus_data.userComment,
	qus_data.correctAnswer,
	CASE
		WHEN qus_data.correctAnswer = qus_data.userAnswer THEN 'Correct'
		ELSE 'Incorrect'
	END AS isAnswerCorrect
FROM
	aml_user_details aud
LEFT JOIN
	user_ usr_usr
ON
	aud.userSsoId = usr_usr.screenName
LEFT JOIN
	user_ usr_mgr
ON
	aud.managerSsoId = usr_mgr.screenName
LEFT JOIN
	(
		SELECT
			aqr_temp.amlResultId,
			aqr_temp.percentageAchieved,
			aqr_temp.userSsoId,
			aqr_temp.createDate,
			aqr_temp.isQuizzPassed
		FROM
			aml_quizz_result aqr_temp
		INNER JOIN
			(
				SELECT
					aml_quizz_result.userSsoId,
					MAX(aml_quizz_result.amlResultId) AS maxReaultId
				FROM
					aml_quizz_result
				GROUP BY
					aml_quizz_result.userSsoId
			) aqr_temp2
		ON
			aqr_temp.amlResultId = aqr_temp2.maxReaultId
	)  aqr
ON
	aud.userSsoId = aqr.userSsoId
LEFT JOIN
	(
		SELECT
				aqq.amlQuestionId AS questionNumber,
				aqa.amlQuizzAnswerId AS answerId,
				aqq.questionDescription AS question,
				aqa.amlOptionId AS optionId,
				aqo.optionDescription AS userAnswer,
				aqa.amlOptionComment AS userComment,
				cor_ans.optionDescription AS correctAnswer,
				aqa.userSsoId
			FROM
				aml_quizz_answer aqa
			INNER JOIN
				(
					SELECT
						aml_quizz_answer.userSsoId,
						aml_quizz_answer.amlQuestionId,
						max(aml_quizz_answer.amlQuizzAnswerId) AS maxAnsId
					FROM
						aml_quizz_answer
					GROUP BY
						aml_quizz_answer.userSsoId, aml_quizz_answer.amlQuestionId
					ORDER BY
						aml_quizz_answer.amlQuestionId asc
				) aqa_temp
			ON
				aqa.amlQuizzAnswerId = aqa_temp.maxAnsId
			INNER JOIN
				aml_quizz_questions aqq
			ON
				aqq.amlQuestionId = aqa.amlQuestionId
			INNER JOIN
				aml_quizz_options aqo
			ON
				aqa.amlOptionId = aqo.amlOptionId
			INNER JOIN
				(
					SELECT
						aqo.amlQuestionId,
						aqo.optionDescription
					FROM
						aml_quizz_options aqo
					WHERE
						aqo.isOptionCorrect = 1
				) cor_ans
			ON
				aqq.amlQuestionId = cor_ans.amlQuestionId
	) qus_data
ON
	aud.userSsoId = qus_data.userSsoId
;

-- for prod environment where user table name = User_

SELECT
	aud.userSsoId,
	aud.amlUserName,
	usr_usr.emailAddress AS amlUserEmail,
	aud.userMobileNo,
	CONCAT(usr_mgr.firstName, ' ', usr_mgr.lastName) AS managerName,
	usr_mgr.emailAddress AS managerEmail,
	aud.managerMobileNo,
	aud.assignDate,
	CASE
		WHEN aud.amlQuizzStatus = 2 THEN 'NOT ATTEMPTED'
		WHEN aud.amlQuizzStatus = 1 THEN 'PASS'
		WHEN aud.amlQuizzStatus = 0 THEN 'FAIL'
	END AS quizStatus,
	aqr.percentageAchieved,
	aqr.createDate AS quizAttemptDate,
	qus_data.questionNumber,
	qus_data.question,
	qus_data.userAnswer,
	qus_data.userComment,
	qus_data.correctAnswer,
	CASE
		WHEN qus_data.correctAnswer = qus_data.userAnswer THEN 'Correct'
		ELSE 'Incorrect'
	END AS isAnswerCorrect
FROM
	aml_user_details aud
LEFT JOIN
	User_ usr_usr
ON
	aud.userSsoId = usr_usr.screenName
LEFT JOIN
	User_ usr_mgr
ON
	aud.managerSsoId = usr_mgr.screenName
LEFT JOIN
	(
		SELECT
			aqr_temp.amlResultId,
			aqr_temp.percentageAchieved,
			aqr_temp.userSsoId,
			aqr_temp.createDate,
			aqr_temp.isQuizzPassed
		FROM
			aml_quizz_result aqr_temp
		INNER JOIN
			(
				SELECT
					aml_quizz_result.userSsoId,
					MAX(aml_quizz_result.amlResultId) AS maxReaultId
				FROM
					aml_quizz_result
				GROUP BY
					aml_quizz_result.userSsoId
			) aqr_temp2
		ON
			aqr_temp.amlResultId = aqr_temp2.maxReaultId
	)  aqr
ON
	aud.userSsoId = aqr.userSsoId
LEFT JOIN
	(
		SELECT
				aqq.amlQuestionId AS questionNumber,
				aqa.amlQuizzAnswerId AS answerId,
				aqq.questionDescription AS question,
				aqo.optionDescription AS userAnswer,
				aqa.amlOptionComment AS userComment,
				cor_ans.optionDescription AS correctAnswer,
				aqa.userSsoId
			FROM
				aml_quizz_answer aqa
			INNER JOIN
				(
					SELECT
						aml_quizz_answer.userSsoId,
						aml_quizz_answer.amlQuestionId,
						max(aml_quizz_answer.amlQuizzAnswerId) AS maxAnsId
					FROM
						aml_quizz_answer
					GROUP BY
						aml_quizz_answer.userSsoId, aml_quizz_answer.amlQuestionId
				) aqa_temp
			ON
				aqa.amlQuizzAnswerId = aqa_temp.maxAnsId
			INNER JOIN
				aml_quizz_questions aqq
			ON
				aqq.amlQuestionId = aqa.amlQuestionId
			INNER JOIN
				aml_quizz_options aqo
			ON
				aqa.amlOptionId = aqo.amlOptionId
			INNER JOIN
				(
					SELECT
						aqo.amlQuestionId,
						aqo.optionDescription
					FROM
						aml_quizz_options aqo
					WHERE
						aqo.isOptionCorrect = 1
				) cor_ans
			ON
				aqq.amlQuestionId = cor_ans.amlQuestionId
	) qus_data
ON
	aud.userSsoId = qus_data.userSsoId
;


=====================


-- bunty ka query

SELECT
	ct.accountId,
	op.accountId,
	ct.name,
	op.name
FROM
	Contact ct
LEFT JOIN
	Opportunity op
ON
	ct.accountId = op.accountId
GROUP BY
	ct.accountId, op.accountId