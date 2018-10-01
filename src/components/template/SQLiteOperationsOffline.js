import axios from 'axios';
var SQLite= require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'resoltz.db', createFromLocation:'~test.db'}, this.openCB, this.errorCB)
import API from './constants.js';
export const openCB = ()=>{
	console.log("open database")
}

export const errorCB = (err)=>{
	console.log("error in open database : ", err);
}

function addToSQLiteTable (data){
	return new Promise((resolve, reject)=>{
		var query = "INSERT into "+data.table_name+" VALUES ( ";
		var temp = "";
		data.table_data.map(table=>{
			temp+= table+",";
		})
		query+=temp.substring(0, temp.length-1)+" )";
		console.log(query);
		db.executeSql(query, [],
		()=>{
			console.log("inserted Successfully");
			let response =
		  	{
  			'message': 'Data stored successfully in :'+data.table_name,
  			'show':'Data stored',
  			'status':true,
  			'data':[]
			};
			resolve (response)
		},
		(error)=>{
			console.log(error.message);
			let response =
		  	{
  			'message': 'error in data storing in :'+data.table_name,
  			'show':'Data not stored',
  			'status':false,
  			'data':[],
  			error:error
			};
			reject (response)
		});
	});
}

function getCoursesOffline(studentID){
	return new Promise((resolve, reject)=>{
		console.log("Course offline")
		let Query = "SELECT * FROM course where relation="+studentID;
		db.transaction((tx) => {
			tx.executeSql(Query, [], (tx, results) => {
				let length = results.rows.length;
				let allCourses =[];
				if(length<=0){
				  	let response =
				  	{
		  			'message': 'No data under course table',
		  			'show':'No courses found',
		  			'status':false,
		  			'data':allCourses
					};
					resolve (response)
				}
				else{
					for(let i = 0; i<length; i++){
						let row = results.rows.item(i);
						allCourses.push(row);
					}
					let response ={
						message:"No Network, data from SQLite",
						show:"Course details from Local",
						status:true,
						data:allCourses
					};
					resolve (response)

				}
			})
		})
	});
}
function getWorkoutsOffline(courseID){
	return new Promise((resolve, reject)=>{
		let Query = "SELECT * FROM workout where relation ="+courseID;
		db.transaction((tx) => {
			tx.executeSql(Query, [], (tx, results) => {
				let length = results.rows.length;
				let allWorkouts =[];
				if(length<=0){
				  	let response =
				  	{
		  			message: 'No data under workout table',
		  			data:allWorkouts,
		  			show:'No workouts available',
		  			status:false,
		  			mode:false
					};
					resolve(response);
				}
				else{
					for(let i = 0; i<length; i++){
						let row = results.rows.item(i);
						allWorkouts.push(row);
					}
					let response ={
						message:"No Network, data from SQLite",
						status:true,
						data:allWorkouts,
						mode:false
					};
					resolve (response)
				}
			})
		})
	});
}
function getExercisesOffline (workoutID){
	return new Promise((resolve, reject)=>{
		let Query = "SELECT * FROM exercise where relation ="+workoutID;
		db.transaction((tx) => {
			tx.executeSql(Query, [], (tx, results) => {
				console.log(results)
				let length = results.rows.length;
				let allExercises =[];
				if(length<=0){
				  	let response =
				  	{
		  			message: 'No data under exercise table',
		  			show:'No data found',
		  			status:false,
		  			data:allExercises
					};
					resolve(response);
				}
				else{
					for(let i = 0; i<length; i++){
						let row = results.rows.item(i);
						allExercises.push(row);
					}
					let response ={
						message:"No Network, data from SQLite",
						status:true,
						data:allExercises
					};
					resolve(response);
				}
			})
		})
	});
}
function getExercisesDetailsOffline (exerciseID){
	return new Promise((resolve, reject)=>{
		let Query = "SELECT * FROM exercise where id="+exerciseID;
		db.transaction((tx) => {
			tx.executeSql(Query, [], (tx, results) => {
				let length = results.rows.length;
				let allExercises =[];
				if(length<=0){
				  	let response =
				  	{
		  			'message': 'No data under exercise table',
		  			'show':'No data found',
		  			'status':false,
		  			data:allExercises
					};
					resolve(response);
				}
				else{
					for(let i = 0; i<length; i++){
						let row = results.rows.item(i);
						allExercises.push(row);
					}
					let response ={
						message:"No Network, data from SQLite",
						status:true,
						data:allExercises
					};
					resolve(response);
				}
			})
		})
	});
}
export const getExerciseSummary = ()=>{
	let Query = "SELECT * FROM exercise_summary";
	db.transaction((tx) => {
		tx.executeSql(Query, [], (tx, results) => {
			let length = results.rows.length;
			let allExercise_summary =[];
			if(length<=0){
			  	let response =
			  	{
	  			'message': 'No data under exercise_summary table',
	  			'show':'No data found',
	  			'status':0
				};
				console.log(response);
			}
			else{
				for(let i = 0; i<length; i++){
					let row = results.rows.item(i);
					allExercise_summary.push(row);
				}
				let response ={'allExercise_summary':allExercise_summary};
				console.log(response);
			}
		})
	})
}

export const getExercisesMetrics = ()=>{
	let Query = "SELECT * FROM exercise_metrics";
	db.transaction((tx) => {
		tx.executeSql(Query, [], (tx, results) => {
			let length = results.rows.length;
			let allExercise_metrics =[];
			if(length<=0){
			  	let response =
			  	{
	  			'message': 'No data under exercise_metrics table',
	  			'show':'No data found',
	  			'status':0
				};
				console.log(response);
			}
			else{
				for(let i = 0; i<length; i++){
					let row = results.rows.item(i);
					allexercise_metrics.push(row);
				}
				let response ={'exercise_metrics':allExercise_metrics};
				console.log(response);
			}
		})
	})
}

export const getSensorDataSQLite = (exercise_id)=>{
	return new Promise((resolve, reject)=>{
		let Query = "SELECT * FROM sensor_data WHERE exercise_id="+exercise_id;
		db.transaction((tx) => {
			tx.executeSql(Query, [], (tx, results) => {
				console.log(results)
				let length = results.rows.length;
				let sensorData =[];
				if(length<=0){
				  	let response = {
		  			'message': 'No data under sensor_data table',
		  			'show':'No data found',
		  			'status':0
					};
					resolve(response);
				}
				else{
					for(let i = 0; i<length; i++){
						let row = results.rows.item(i);
						sensorData.push(row);
					}
					let response ={
						message:"Data from SQLite",
						status:true,
						data:sensorData
					};
					resolve(response);
				}
			})
		})
	});
}


function insertIntoTable(table_datas){
	console.log(table_datas)
	return new Promise((resolve, reject)=>{
		if(!table_datas.table_data.length&&!table_datas.table_name=="student"){
			resolve({
	        	message:"No data under this student",
	        	show:"No data available",
				status:false,
				data:table_datas.table_data
			});
		}else{
			console.log(table_datas)
			db.executeSql("delete from "+ table_datas.table_name+" where relation ="+table_datas.relation);
			table_datas.table_data.map((data, index)=>{
				var query = "INSERT into "+table_datas.table_name+"(";
				var temp1 = "";
				var temp2 = "";
				Object.keys(data).map(key => {
					temp1+=key+",";
					temp2+="\""+String(data[key])+"\",";
		        });
		        query+=temp1+"relation"+") VALUES ("+String(temp2+table_datas.relation)+")";
		        console.log(query);
		        db.executeSql(query, [],
				()=>{
					console.log("inserted Successfully", index);
					if(index===table_datas.table_data.length-1){
						resolve({
				        	message:"get and insert done Successfully",
				        	show:"data available",
							status:true,
							data:table_datas.table_data
						});
					}
				},
				(error)=>{
					reject({
			        	message:"error in insertion to sqlite",
			        	show:"data available",
						status:true,
						data:table_datas.table_data,
						error:error
					});
				});
			});
		}
	});
}

export const showAllTable = ()=>{
	db.transaction((tx) => {
	let sampleQuery = "SELECT * FROM course";
	let exerciseMetricsQuery = "SELECT * FROM exercise_metrics";
	let exerciseSummaryQuery = "SELECT * FROM exercise_summary";
	let sensorDataQuery = "SELECT * FROM sensor_data";
	tx.executeSql(sampleQuery, [], (tx, results) => {
	let length = results.rows.length;
	if(length<=0){
	  console.log("No data under course table : ",length," rows");
	}else{
	  console.log("course table data : ",length," rows")
	  for(let i = 0; i<length; i++){
	    let row = results.rows.item(i);
	    console.log("Record:",row);
	  }
	}
	});
	tx.executeSql(exerciseSummaryQuery, [], (tx, results) => {
	let length = results.rows.length;
	if(length<=0){
	  console.log("No data under exercise summary table : ",length," rows");
	}else{
	  console.log("exercise summary table data : ",length," rows")
	  for(let i = 0; i<length; i++){
	    let row = results.rows.item(i);
	    console.log("Record:",row);
	  }
	}
	});
	tx.executeSql(sensorDataQuery, [], (tx, results) => {
	let length = results.rows.length;
	if(length<=0){
	  console.log("No data under sensor data table : ",length," rows");
	}else{
	  console.log("sensor data table data : ",length," rows")
	  for(let i = 0; i<length; i++)
	  {
	    let row = results.rows.item(i);
	    console.log("Record:",i,":",row);
	  }
	}
	});
	});
}
function getProfileDetails(studentID){
	return new Promise((resolve, reject)=>{
		axios.get(API.GetProfile+studentID)
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
		    	var temp=[];
		    	temp.push(response.data.data)
		    	resolve(
    				insertIntoTable({'table_data':temp, table_name:'student',relation:studentID})
					.then((status)=>{
			        	return({
				        	message:"data stored in sqlite",
				        	show:"Successfully got profile",
							status:status.status,
							data:response.data.data
						})
			    	},error=>{
			    		return(error)
			    	})
			    );
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
	    		let Query = "SELECT * FROM student where relation="+studentID;
				db.transaction((tx) => {
					tx.executeSql(Query, [], (tx, results) => {
						let length = results.rows.length;
						let studentDetails =[];
						if(length<=0){
						  	let response =
						  	{
				  			'message': 'No data under exercise table',
				  			'show':'No data found',
				  			'status':false,
				  			data:studentDetails
							};
							resolve(response);
						}
						else{
							for(let i = 0; i<length; i++){
								let row = results.rows.item(i);
								studentDetails.push(row);
							}
							let response ={
								'message': 'got data from student table',
					  			'show':'data found',
					  			'status':true,
					  			data:studentDetails
					  		};
							resolve(response);
						}
					})
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
	insertIntoTable,
	getWorkoutsOffline,
	getExercisesOffline,
	getExercisesDetailsOffline,
	getCoursesOffline,
	getProfileDetails,
	addToSQLiteTable };
