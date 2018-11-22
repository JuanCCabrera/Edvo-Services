const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1'; //database url 

const client = new pg.Client(connectionString); //initializing client path
client.connect(); //connecting database
//tables creation
var query1 = client.query('create table institution(institutionID varchar(30) primary key not null unique, name varchar(100), location varchar(150), schoolType varchar(20), accounts smallint, accountsused smallint)');
var query2 = client.query('create table users(userID text primary key unique not null, institutionID varchar(30) references institution(institutionID), userType varchar(15),  name varchar(100), lastname varchar(100), gender varchar(10), email varchar(100) unique not null, password varchar(100), DOB date, memberSince timestamp, policies boolean)');
var query3 = client.query('create table user_info(userID text primary key references users(userID), teacherSince date, education varchar(30),  english boolean, spanish boolean, strategies boolean, material boolean, timeManagement boolean, tech boolean, instructions boolean)');
var query4 = client.query('create table school_info(userID text primary key references users(userID), name varchar(100), location varchar(150),  schoolType varchar(20),  moodle boolean, googleClassroom boolean, emails boolean, books boolean, applications boolean, socialMedia boolean, projector boolean, computer boolean, tablet  boolean, stylus  boolean, internet boolean, smartboard boolean, smartpencil boolean, speakers boolean)');
var query5 = client.query('create table class_info(userID text references users(userID), classInfoID serial not null unique, subject varchar(100), format varchar(10), language varchar(20), level varchar(25), groupsize varchar(10), topicA varchar(50), topicB varchar(50), topicC varchar(50), primary key (userID, classInfoID))');
var query6 = client.query('create table coupons(couponID varchar(30) primary key not null unique, name varchar(100))');
var query7 = client.query('create table coupons_used(couponID varchar(30) not null references coupons(couponID), userID text references users(userID) not null, dateUsed timestamp, primary key (userID, couponID))');
var query8 = client.query('create table questions(askedDate timestamp not null, userID text references users(userID), subject varchar(100), question text not null, answer text, answerDate timestamp, rate varchar(2), favorite boolean, read boolean, mentorID text references users(userID), primary key(userID, askedDate))');
var query9 = client.query('create table subscription(userID text primary key references users(userID), token text, status varchar(20), type varchar(50))');
var query10 = client.query('create table log_record(logID serial unique not null, userID text references users(userID), date timestamp not null, primary key(userID, logID))');
var query11 = client.query('create table recommendations(recomID serial unique not null primary key, location varchar(150), subject varchar(100), spanish boolean, english boolean, type varchar(20), schoolType varchar(20), format varchar(10), groupsize varchar(10), level varchar(25), mentorID text references users(userID), active boolean)');
var query12 = client.query('create table recommendation_body(recomID integer unique not null primary key references recommendations(recomID), title varchar(200), multimedia text, header varchar(200), description text)');
var query13 = client.query('create table recommendation_target(recomID integer unique not null primary key references recommendations(recomID), strategies boolean, material boolean, timeManagement boolean, tech boolean, instructions boolean)');
var query14 = client.query('create table recommendation_req(recomID integer unique not null primary key references recommendations(recomID), moodle boolean, googleClassroom boolean, emails boolean, books boolean, applications boolean, socialMedia boolean, projector boolean, computer boolean, tablet  boolean, stylus  boolean, internet boolean, smartboard boolean, smartpencil boolean, speakers boolean)');
var query15 = client.query('create table recommendation_topics(recomID integer unique not null primary key references recommendations(recomID), topicA varchar(50), topicB varchar(50), topicC varchar(50))');
var query16 = client.query('create table edu_recommendations(recomID integer not null references recommendations(recomID), userID text references users(userID), date timestamp, rate varchar(2), favorite boolean, read boolean, primary key(recomID, userID))');
var query17 = client.query('create table quiz_question(quizQuestionID serial unique not null primary key, question varchar(700), recomID integer references recommendations(recomID))');
var query18 = client.query('create table quiz_question_choice(choiceID serial unique not null, quizQuestionID integer references quiz_question(quizQuestionID), choice varchar(400), correctAnswer boolean not null, primary key(choiceID, quizQuestionID))');
var query19 = client.query('create table quiz(quizID serial unique not null, userID text references users(userID) not null,count smallint, score smallint, created timestamp, primary key(quizID, userID))');
var query20 = client.query('create table quiz_qs(quizID integer references quiz(quizID) not null, choiceID integer references quiz_question_choice(choiceID), quizQuestionID integer references quiz_question(quizQuestionID) not null, recommendationtitle varchar(200), primary key(quizID, quizQuestionID))');
//variable to count queries in order to guarantee live connection during asynchronous calls
var count = 20;

//ending connection function
function endHandler () {
   count--; // decrement count by 1
   if (count === 0) {
       // all queries have ended, lets close the connection.
       client.end();
   }
}

query1.on('end', endHandler);
query2.on('end', endHandler);
query3.on('end', endHandler);
query4.on('end', endHandler);
query5.on('end', endHandler);
query6.on('end', endHandler);
query7.on('end', endHandler);
query8.on('end', endHandler);
query9.on('end', endHandler);
query10.on('end', endHandler);
query11.on('end', endHandler);
query12.on('end', endHandler);
query13.on('end', endHandler);
query14.on('end', endHandler);
query15.on('end', endHandler);
query16.on('end', endHandler);
query17.on('end', endHandler);
query18.on('end', endHandler);
query19.on('end', endHandler);
query20.on('end', endHandler);