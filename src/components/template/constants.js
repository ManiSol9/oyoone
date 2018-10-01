 const url = "http://resoltz.azurewebsites.net";
//const url = 'http://192.168.1.110:3002'
module.exports = {
	Signup: url + '/api/v1/signup',
	Signin: url + '/api/v1/signin',
	GetAllCourse: url + '/api/v1/course/all/',/*/page/limit/*/
	ForgotPassword: url + '/api/v1/forgetpassword',
	CSVUpload: url + '/api/v1/fileupload/uploadandregister',
	ValidateEmail: url + '/api/v1/validateemail',
	UpdateProfile: url + '/api/v1/userdetails/updateprofile',
	UpdatePassword: url + '/api/v1/updatepassword',
	GetProfile: url + '/api/v1/userdetails/profiledetails/',
	GetAllStudents: url + '/api/v1/userdetails',
	GetAllExercise: url + '/api/v1/exercise/',
	GetAllPlans: url + '/api/v1/course/use',
	GetAllWorkout: url + '/api/v1/workout/',
	GetAllDetailsOfPlan: url + '/api/v1/course/exercise/',
	GetStudentUnderExercise: url + '/api/v1/userdetails/exercise/',
	SubscribeToCourse: url + '/api/v1/course/assign',
	UploadVideo: url + '/api/v1/video/upload',
	CreateExercise: url + '/api/v1/exercise/create',
	CreateWorkout: url + '/api/v1/workout/create',
	CreatePlan: url + '/api/v1/course/create',
	GetExercisesUnderWorkout: url + '/api/v1/exercise/workout/',
	GetWorkoutsUnderCourse: url + '/api/v1/workout/course/',
	GetStudentsUnderCourse: url + '/api/v1/userdetails/course/',
	GetCourseUnderStudent:url+"/api/v1/course/student/",
	GetExerciseDetails:url+"/api/v1/exercise/exercise/",
	AddSensorData:url + '/api/v1/sensordata',
	GetSensorData:url +'/api/v1/sensordata/'/*user_id/exercise_id*/,
	SendExerciseCompletion:url+'/api/v1/status/exercisestatus',
	GetUpcomingWorkouts:url+'/api/v1/workout/upcoming/student/',
	GetWorkoutByWorkoutId:url+'/api/v1/workout/',
	SendActivityLog:url+'/api/v1/activitylog/log',
	GetFeedData:url+'/api/v1/feed/user/',
  Image_url : url+'/api/v1/imageupload/upload',
  GetGIFurl : url+'/api/v1/mediaservices/getimageurl'
}
