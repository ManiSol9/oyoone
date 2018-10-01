import { AsyncStorage } from "react-native";
import axios from 'axios';

import {
	insertIntoTable,
	getCoursesOffline 
} from '../SQLiteOperationsOffline.js';
import API from '../constants.js';
import { onSignIn, getStudentName, getStudentId } from '../../../config/auth';

function getCourses(studentID){
	console.log("Course under student : ",studentID)
	return new Promise((resolve, reject)=>{
		axios.post(API.GetAllCourse, {"page":1,"limit" : 100,"user_id":studentID})
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
		    	resolve(
					insertIntoTable({'table_data':response.data.courses, table_name:'course', relation:studentID})
					.then((course)=>{
			        	return(course)
			    	},error=>{
			    		return(error)
			    	})
				);
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
 
function subscribeByStudent(subscribe){
console.log("Subscribe by student_id : ",subscribe.course_id+" for course_id: "+subscribe.user_id, "Subscribe : ", subscribe)
	return new Promise((resolve, reject)=>{
		axios.post(API.SubscribeToCourse,{list:subscribe})
		.then(function(response){
			console.log(response);
			if(response.status==200||response.status==201||response.status==500){
				resolve({
					message:response.data.message,
		        	show:"Subscribed successfully",
					status:true,
					data:[]
				});
			}else if(response.status==204){
				resolve({
		        	message:response.data.message,
		        	show:"Data not found",
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
	getCourses, subscribeByStudent
};
