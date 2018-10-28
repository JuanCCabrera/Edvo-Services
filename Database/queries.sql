#verify user permision
SELECT usertype FROM users WHERE userid='test1';

#verify user is active member
SELECT status FROM subscription WHERE userid=userid;

#CREATE NEW USER
insert into users(userid, usertype, name, lastname, gender, email, password, dob, membersince, policies) values ('test1', 'teacher', 'Tam', 'Glez', 'female', 'email@example.com', '1a2b3c', '2018-10-20', '1990-01-01 10:10:02', true);
insert into user_info(userid, teachersince, education, English, spanish, strategies, material, timemanagement, tech, instructions) values ('test1', '2018-01-01', 'Bachelors Degree', true, true, true, true, true, true, false);
insert into class_info(userid, subject, format, language, level, groupsize, topica, topicb, topicc) values ('test1', 'Math', 'online', 'english', '4th - 6th grade', '1-10', 'algebra', 'lineal','multiplicacion'); 
insert into school_info(userid, name, location, schooltype, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers) values( 'test1', 'UPR Mayaguez', 'Mayaguez, PR', 'private', false, false, true, true, false, false, true, true, false, false, true, false, false, true);

#delete class
DELETE FROM class_info WHERE (userid= 'test1' AND classinfoid = 1);

#Get classes of user
SELECT * FROM class_info WHERE userid='test1';

#add more classes 
insert into class_info(userid, subject, format, language, level, groupsize, topica, topicb, topicc) values ('test1', 'Math', 'online', 'english', '4th - 6th grade', '1-10', 'algebra', 'lineal','multiplicacion'); 

#create coupon
insert into coupons (couponid, name) values('10off', '10off subscription');

#user subscribed
insert into subscription (userid, token, status, type) values ('test1', '1234567890', 'active', 'basic');
insert into coupons_used (couponid, userid, dateused) values ('10off', 'test1', '2017-01-01 10:23:00');


#upgrade/downgrade/cancel subscription
UPDATE subscription SET token='09876543', type='basic' WHERE userid = 'test1';
UPDATE subscription SET token='09876543', type='pro' WHERE userid = 'test1';
UPDATE subscription SET status = 'cancelled' WHERE userid = 'test1';

#remove user
UPDATE subscription SET status = 'deleted' WHERE userid= 'test2';

#change user permissions
UPDATE users SET usertype='mentor' WHERE userid= 'test2';

#get info to edit profile 
SELECT name, lastname, gender, dob FROM users WHERE userid=1;

#EDIT USER PROFILE
UPDATE users SET name='lola', lastname='Glez', gender='female',  dob = '1998-01-01' WHERE userid = 'test2';

#add institution
INSERT into institution (institutionid, name, location, schooltype, accounts, accountsused) values ('CSA123', 'colegio san antonio', 'isabela, PR', 'private', 10, 0);

#remove institution
DELETE FROM institution WHERE institutionid='CSA123'
UPDATE subscription SET status = 'suspended' WHERE userid IN (select userid from users WHERE institutionid = 'CSA123');

#Create Recommendation and quiz question
INSERT into recommendations (location, subject, spanish, english, type, schooltype, format, groupsize, level, mentorid, active) values (null, 'Math', true, false, 'strategy', 'private', 'online', '1-10', '4th - 6th grade', 'mentor1', true) RETURNING recomid;
INSERT  into recommendation_topics (recomid, topica,topicb,topicc) values (2, 'algebra', 'lineal','multiplicacion');
INSERT  into recommendation_target(recomid, startegies, material, timemanagement, tech, instructions) values (2, true, true, true, true, false);
INSERT  into recommendation_body (recomid, title, multimedia, header, description) values (2, 'This is a Recommendation', 'this is a multimedia url', 'Your 2nd recommendation', 'The description for your 2nd recommendation');
INSERT  into recommendation_req(recomid, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers) values (2, false, false, true, true, false, false, true, true, false, false, true, false, false, true);
INSERT into quiz_question (question, recomid) values ('is this your second recommendation?', 2 ) RETURNING quizquestionid;
INSERT into quiz_question_choice (quizquestionid, choice, correctanswer) values (2, 'yes', true);
INSERT into quiz_question_choice (quizquestionid, choice, correctanswer) values (2, 'no', false);
INSERT into quiz_question_choice (quizquestionid, choice, correctanswer) values (2, 'maybe', false);

#update recomendation
UPDATE recommendations SET location=location, subject = subject, spanish=spanish, english = english, type=type, schooltype=schoolType, format= format, groupsize =groupSize, level=level, mentorid=mentorID, active = active WHERE recomid =recomID;
UPDATE recommendation_topics SET topica=topicA, topicb= topicB, topicc=topicC WHERE recomid =recomID;
UPDATE recommendation_target SET strategies= strategies, material = material, timemanagement=timeManagement, tech= tech, instructions= instructions WHERE recomid =recomID;
UPDATE recommendation_body SET title= title, multimedia = multimedia, header= header, description = description WHERE recomid =recomID;
UPDATE recommendation_req SET moodle = moodle, googleclassroom= googleClassroom, emails = emails, books=books, applications=applications, socialmedia=socialmedia, projector=projector, computer=computer, tablet=tablet, stylus= stylus, internet= internet, smartboard= smartboard, smartpencil= smartpencil, speakers=speakers WHERE recomid=recomID;
UPDATE quiz_question SET question= question WHERE recomid = recomID;
UPDATE quiz_question_choice SET choice=choice, correctanswer=correctanswer WHERE choiceid = choiceid;

#remove recomendation
UPDATE recommendations SET active = false WHERE recomid = recomID;

#assign Recomendation
INSERT into edu_recommendations (recomid, userid, date, read, favorite, rate) values (1, 'test1', '2018-10-27 01:24:07', false, false, 0);

#read recommendation
UPDATE edu_recommendations SET read =true WHERE recomid=1 AND userid='test2';

#rate recommendation
UPDATE edu_recommendations SET rate=5 WHERE recomid=2 AND userid='test1'

#favorite recommendation
UPDATE edu_recommendations SET favorite=true WHERE recomid=2 AND userid='test1'

#get recommendation for single user
with teacher_recom as (SELECT er.recomid, userid, date, rate, favorite, read, location, subject, spanish, english, type, schooltype, format, groupsize, level, mentorid, active  FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid='test2'),
recom_body as (SELECT rb.recomid, title, multimedia, header, description, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid),
recom_target as (Select rt.recomid, startegies, material, timemanagement, tech, instructions, topica,topicb,topicc FROM recommendation_target rt INNER JOIN recommendation_topics ON rt.recomid = recommendation_topics.recomid)
SELECT * FROM recom_body tr NATURAL INNER JOIN recom_target NATURAL INNER JOIN teacher_recom;

#get favorite recomendations for single user
with teacher_recom as (SELECT er.recomid, userid, date, rate, favorite, read, location, subject, spanish, english, type, schooltype, format, groupsize, level, mentorid, active  FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid='test1' AND favorite=true),
recom_body as (SELECT rb.recomid, title, multimedia, header, description, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid),
recom_target as (Select rt.recomid, startegies, material, timemanagement, tech, instructions, topica,topicb,topicc FROM recommendation_target rt INNER JOIN recommendation_topics ON rt.recomid = recommendation_topics.recomid)
SELECT * FROM recom_body tr NATURAL INNER JOIN recom_target NATURAL INNER JOIN teacher_recom ORDER BY date DESC;

#get recent recommendations by user ordered by date
 with teacher_recom as (SELECT er.recomid, userid, date, rate, favorite, read, location, subject, spanish, english, type, schooltype, format, groupsize, level, mentorid, active  FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid='test1'),
recom_body as (SELECT rb.recomid, title, multimedia, header, description, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid),
recom_target as (Select rt.recomid, startegies, material, timemanagement, tech, instructions, topica,topicb,topicc FROM recommendation_target rt INNER JOIN recommendation_topics ON rt.recomid = recommendation_topics.recomid)
SELECT * FROM recom_body tr NATURAL INNER JOIN recom_target NATURAL INNER JOIN teacher_recom ORDER BY date DESC;

#get top rated recomendations ordered by rate and date
with teacher_recom as (SELECT er.recomid, userid, date, rate, favorite, read, location, subject, spanish, english, type, schooltype, format, groupsize, level, mentorid, active  FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid='test1'),
recom_body as (SELECT rb.recomid, title, multimedia, header, description, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid),
recom_target as (Select rt.recomid, startegies, material, timemanagement, tech, instructions, topica,topicb,topicc FROM recommendation_target rt INNER JOIN recommendation_topics ON rt.recomid = recommendation_topics.recomid)
SELECT * FROM recom_body tr NATURAL INNER JOIN recom_target NATURAL INNER JOIN teacher_recom ORDER BY rate DESC, date DESC;

#ask question by teacher
INSERT into questions (askeddate, userid, subject, question, read, favorite, rate) values ('2018-10-28 02:26:36', 'test1', 'ENGLISH', 'this is an example question?', false, false, 0);

#get questions unanswered
SELECT question, askeddate, subject, userid FROM questions WHERE answer is null;

#asnwer question
UPDATE questions SET answer = 'this is the answer to your question', answerdate = '2018-10-28 12:55:54', mentorid = 'mentor1' WHERE (userid='test1' AND askeddate = '2018-10-28 12:55:54');

#mark read questions answered
UPDATE questions SET read=true WHERE userid = userID AND askeddate = askeddate AND answer is not null;

#rate questions answered
UPDATE questions SET rate=5 WHERE userid = 'test1' AND askeddate = '2018-10-28 12:55:54' AND answer is not null;

