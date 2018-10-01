import { AsyncStorage } from "react-native";
import axios from 'axios';

import {
	addToTable,
	showAllTable,
	getDevicesOffline,
	getCoursesOffline,
	getWorkoutsOffline,
	getExercisesOffline,
	getExercisesMetrics,
	getExerciseSummary,
	insertIntoTable,
	getExercisesDetailsOffline } from './SQLiteOperationsOffline.js';
import API from './constants.js';
import { onSignIn, getStudentName, getStudentId } from '../../config/auth';

function getCourses(studentID){
	console.log("Course under student : ",studentID)
	return new Promise((resolve, reject)=>{
		fetch(API.GetAllCourse)
		.then(function(response) {
			console.log(response)
			if(response.status==404||response.status==500){
		        resolve({
		        	message:response._bodyText,
		        	show:"Server problem",
					status:response.ok,
					data:[]
				});
		    }else if(response.status==200){
		    	response.json()
				.then(res=>{
					resolve(
						insertIntoTable({'table_data':res.courses, table_name:'course', relation:studentID})
						.then((course)=>{
				        	return(course)
				    	},error=>{
				    		return(error)
				    	})
					);
				})
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Course not found",
					status:false,
					data:[]
				});
		    }
	    })
	    .catch(function(error) {
	    	console.log(error.message)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		console.log("no internet course offline")
	    		resolve(
		        	getCoursesOffline(studentID)
		        	.then((response)=>{
					    return(response)
					})
				);
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"Course not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
	    })
	})
}


function getSensorData( user_id, exercise_id, workout_id, workout_day, course_id ){
	console.log(API.GetSensorData+user_id+'/'+exercise_id+'/'+workout_id+'/'+workout_day+'/'+course_id)
	return new Promise((resolve, reject)=>{
		axios.get(API.GetSensorData+user_id+'/'+exercise_id+'/'+workout_id+'/'+workout_day+'/'+course_id)
		.then(function(response){
			console.log(response);
			if(response.status==200){
				resolve({
					message:response.data.message,
		        	show:"Got data successfully",
					status:true,
					data:response.data.sensor_details
				});
			}else if(response.status==204){
				resolve({
		        	message:response.data.message,
		        	show:"No user found",
					status:false,
					data:[]
				});
			}
		})
		.catch(function(error){
			console.log(error)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		resolve({
		        	message:error.message,
		        	show:"Check your internet",
					status:false,
					data:[]
				})
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.message,
		        	show:"User not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
		})
	})
}
function addSensorData(data){
	console.log(API.AddSensorData, data)
	return new Promise((resolve, reject)=>{
		axios.post(API.AddSensorData,{
			"user_id":data.user_id,
			"avg_heart_rate":data.avg_heart_rate,
			"calories":data.calories,
			"exercise_id":data.exercise_id,
	      	"course_id": data.course_id,
	      	"workout_id": data.workout_id,
	      	"workout_day":data.workout_day
		})
		.then(function(response){
			console.log(response);
			if(response.status==200){
				resolve({
					message:response.data.message,
		        	show:"Stored successfully",
					status:true,
					data:[]
				});
			}else if(response.status==204){
				resolve({
		        	message:response.data.message,
		        	show:"No user found",
					status:false,
					data:[]
				});
			}
		})
		.catch(function(error){
			console.log(error)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		reject({
		        	message:error.response,
		        	show:"Check your internet",
					status:false,
					data:[]
				})
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"User not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
		})
	});
}
function getWorkouts(courseID, user_id){
	console.log("Exercise under course : ",courseID, "student: ", user_id);
	return new Promise((resolve, reject)=>{
		fetch(API.GetWorkoutsUnderCourse+courseID+'/'+user_id)
		.then(function(response) {
			console.log(response)
			if(response.status==404||response.status==500){
		        resolve({
		        	message:response._bodyText,
		        	show:"Server problem",
					status:response.ok,
					data:[]
				});
		    }else if(response.status==200){
		    	response.json()
				.then(res=>{
					resolve(
						insertIntoTable({'table_data':res.workouts, table_name:'workout', relation:courseID})
						.then((workout)=>{
				        	return({workouts:workout,instructor:res.instructor,mode:true})
				    	},error=>{
				    		return(error)
				    	})
					);
				})
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Workouts not found",
					status:false,
					data:[]
				});
		    }
	    })
	    .catch(function(error) {
	    	console.log(error.message)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		console.log("no internet workout offline")
	    		resolve(
		        	getWorkoutsOffline(courseID)
		        	.then((response)=>{
					    return(response)
					})
				);
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"Workouts not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
	    })
	})
}
function getExercises (workoutID, user_id, workout_day){
	console.log("Exercise under workout : ",workoutID+"/"+user_id+"/"+workout_day);
	return new Promise((resolve, reject)=>{
		fetch(API.GetExercisesUnderWorkout+workoutID+"/"+user_id+"/"+workout_day)
		.then(function(response) {
			console.log(response)
			if(response.status==404||response.status==500){
		        resolve({
		        	message:response._bodyText,
		        	show:"Server problem",
					status:response.ok,
					data:[]
				});
		    }else if(response.status==200){
		    	response.json()
				.then(res=>{
					if(res.list.length){
						resolve(
							insertIntoTable({'table_data':res.list, table_name:'exercise', relation:workoutID})
							.then((course)=>{
					        	return(course)
					    	},error=>{
					    		return(error)
					    	})
						);
					}else{
						resolve({
				        	message:"No data found",
				        	show:"data not available",
							status:false,
							data:[]
						});
					}
				})
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Exercises not found",
					status:false,
					data:[]
				});
		    }
	    })
	    .catch(function(error) {
	    	console.log(error)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		console.log("no internet exercises offline")
	    		resolve(
		        	getExercisesOffline(workoutID)
		        	.then((response)=>{
					    return(response)
					})
				);
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"Exercises not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
	    })
	})
}
function getExerciseDetails (exerciseID){
	console.log("Exercisedetails of exerciseID : ",exerciseID);
	return new Promise((resolve, reject)=>{
		fetch(API.GetExerciseDetails+exerciseID)
		.then(function(response) {
			console.log(response)
			if(response.status==404||response.status==500){
		        resolve({
		        	message:response._bodyText,
		        	show:"Server problem",
					status:response.ok,
					data:[]
				});
		    }else if(response.status==200||response.status==201){
		    	response.json()
				.then(res=>{
					resolve({
			        	message:"get data Successfully",
			        	show:"exercise details available",
						status:true,
						data:res
					});
				})
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Exercises details not found",
					status:false,
					data:[]
				});
		    }
	    })
	    .catch(function(error) {
	    	console.log(error)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		console.log("exercise details offline")
	    		resolve(
		        	getExercisesDetailsOffline(exerciseID)
		        	.then((response)=>{
					    return(response)
					})
				);
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"Exercises details not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
	    })
	})
}
function signin(username, password){
	console.log({"username": username,
            "password": password})
	return new Promise((resolve, reject) => {
		axios.post(API.Signin,{
            "username": username,
            "password": password
        })
		.then(function(response) {
			console.log(username, password)
			if(response.status==404||response.status==500){
		        resolve({
		        	message:response._bodyText,
		        	show:"Server problem",
					status:response.ok,
					data:[]
				});
		    }else if(response.status==200&&response.data.user.user_type.toUpperCase()!="I"){

		    	onSignIn(response.data.user.user_name,response.data.user.id).then(res=>{
		    		if(res){
		    			var temp=[];
		    			temp.push(response.data.user)
		    			resolve(
		    				insertIntoTable({'table_data':temp, table_name:'student',relation:response.data.user.id})
							.then((status)=>{
					        	return({
						        	message:"data stored in asyncstroage",
						        	show:"Successfully logged in",
									status:status.status,
									data:response.data.user
								})
					    	},error=>{
					    		return(error)
					    	})
					    );
		    		}else{
		    			resolve({
				        	message:"error in storing in asyncstroage",
				        	show:"Successfully logged in.",
							status:res,
							data:response.data.user
						});
		    		}
		    	},
		    	error=>{
		    		reject({
			        	message:error,
			        	show:"Problem in AsyncStorage",
						status:false,
						data:[]
					});
		    	});
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"User not found",
					status:false,
					data:[]
				});
		    }else if(response.data.user.user_type.toUpperCase()=="I"){
		    	reject({
		        	message:response.message,
		        	show:"Not a registered student",
					status:false,
					data:[]
				});
		    }
	    })
	    .catch(function(error) {
	    	console.log(error)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		reject({
		        	message:error.response,
		        	show:"Check your internet",
					status:false,
					data:[]
				})
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"User not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
	    })
	});
}
function updateProfile(data){
	console.log({
		"current_weight":data.weight,
		"height_in_feet":data.height,
		"gender":data.gender,
		"age": data.age,
		"id":data.id,
		"profile_img_url":data.imagePath
	})
	return new Promise((resolve, reject)=>{
		console.log('into the promise')
		axios.put(API.UpdateProfile,{
			"current_weight":data.weight,
			"height_in_feet":data.height,
			"gender":data.gender,
			"age": data.age,
			"id":data.id,
			"profile_img_url":data.imagePath
		})
		.then(function(response){
			console.log('in promise in then',response);
			if(response.status==200){
				resolve({
					message:response.data.message,
		        	show:"updated successfully",
					status:true,
					data:[]
				});
			}else if(response.status==204){

				resolve({
		        	message:response.data.message,
		        	show:"User not found",
					status:false,
					data:[]
				});
			}
		})
		.catch(function(error){
			console.log(error)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		reject({
		        	message:error.response,
		        	show:"Check your internet",
					status:false,
					data:[]
				})
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"User not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
		})
	});
}
function sendStatus(data){
	return new Promise((resolve, reject)=>{
		axios.post(API.SendExerciseCompletion,{
			"user_id":data.user_id,
			"exercise_id":data.exercise_id,
			"workout_id":data.workout_id,
			"course_id":data.course_id,
			"exercise_status":data.exercise_status,
			"workout_day":data.workout_day
		})
		.then(function(response){
			console.log(response);
			if(response.status==200){
				resolve({
					message:response.data.message,
		        	show:"updated successfully",
					status:true,
					data:[]
				});
			}else if(response.status==204){
				resolve({
		        	message:response.data.message,
		        	show:"User not found",
					status:false,
					data:[]
				});
			}
		})
		.catch(function(error){
			console.log(error)
	    	if(error.message==="Network Error"||error.message==="Network request failed"){
	    		reject({
		        	message:error.response,
		        	show:"Check your internet",
					status:false,
					data:[]
				})
	    	}else if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"User not found",
					status:false,
					data:[]
				})
	    	}else if(error.response.status==404||error.response.status==500){
		        resolve({
		        	message:error,
		        	show:"Server problem",
					status:false,
					data:[]
				});
		    }
		})
	});
}
export {
	signin, getCourses, getWorkouts, getExercises, getExerciseDetails, updateProfile, addSensorData, getSensorData,
	sendStatus};
