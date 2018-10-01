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
	getExercisesDetailsOffline } from '../SQLiteOperationsOffline.js';
import API from '../constants.js';
import { onSignIn, getStudentName, getStudentId } from '../../../config/auth';

function getUpcomingWorkouts (userID){
	console.log("Upcoming Workouts Under Student : ",API.GetUpcomingWorkouts+userID);
	return new Promise((resolve, reject)=>{
		fetch(API.GetUpcomingWorkouts+userID)
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
			        	show:"Workout details Avaiable",
						status:true,
						data:res
					});
				})
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Workout details not found",
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
		        	show:"Workout details not found",
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

function getWorkoutDetails (workoutID){
	console.log("Workout Details : ",workoutID);
	return new Promise((resolve, reject)=>{
		fetch(API.GetWorkoutByWorkoutId+ workoutID)
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
			        	show:"Workout details Avaiable",
						status:true,
						data:res
					});
				})
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Workout details not found",
					status:false,
					data:[]
				});
		    }
	    })
	    .catch(function(error) {
	    	console.log(error)
 				if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"Workout details not found",
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

function sendActivitylog (title, duration, activity_type, completed_at, completed_on, user_id, avg_heart_rate){
	console.log("Send log activity");
	console.log(API.SendActivityLog)
	//console.log(activitydata)
	return new Promise((resolve, reject)=>{
		axios.post(API.SendActivityLog,{
				"title" :title,
				"duration" :duration,
				"distance":0,
				"activity_type":activity_type,
				"workout_id":0,
				"course_id"	:0,
				"user_id": user_id,
				"exercise_id":0,
				"completed_at" :completed_at,
				"completed_on"   :completed_on,
				"avg_heart_rate" :avg_heart_rate
		})
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

					resolve({
							message:"Stored Successfully",
							show:"Successfully",
					status:response.status,
					data:response.data
				});

		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Workout details not found",
					status:false,
					data:[]
				});
		    }
	    })
	    .catch(function(error) {
	    	console.log(error)
 				if(error.response.status===401){
	    		reject({
		        	message:error.response,
		        	show:"Workout details not found",
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

function getFeed (userID){
	console.log("Feed Data: ",API.GetFeedData+userID);
	return new Promise((resolve, reject)=>{
		fetch(API.GetFeedData+userID)
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
			        	show:"Feed details Avaiable",
						status:true,
						data:res
					});
				})
		    }else if(response.status==401){
		    	reject({
		        	message:response.message,
		        	show:"Feed details not found",
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
		        	show:"Workout details not found",
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


export { getUpcomingWorkouts, getWorkoutDetails,sendActivitylog, getFeed };
