var data=null;
data=JSON.parse(localStorage.getItem("data"));
if(data==null)
{
        data= {}
}
function addDates()
{
    month=document.getElementById("month").value;
    dateOption=document.getElementById("date");
    dateOption.innerHTML='';
    if(month==0)
    {
        var a=document.createElement("option");
        a.setAttribute("value",0);
        a.innerHTML="Select a Month First";
        dateOption.appendChild(a);
    }
    else
    {
        var noOfDays;
        switch(parseInt(month))
        {
            case 1: noOfDays=31;
                    break;
            case 2: noOfDays=28;
                    break;
            case 3: noOfDays=31;
                    break;
            case 4: noOfDays=30;
                    break;
            case 5: noOfDays=31;
                    break;
            case 6: noOfDays=30;
                    break;
            case 7: noOfDays=31;
                    break;
            case 8: noOfDays=31;
                    break;
            case 9: noOfDays=30;
                    break;
            case 10: noOfDays=31;
                    break;
            case 11: noOfDays=30;
                    break;
            case 12: noOfDays=31;
                    break;
        }
        var a=document.createElement("option");
        a.setAttribute("value",0);
        a.innerHTML="Select a Date";
        dateOption.appendChild(a);
        for(i=1;i<=noOfDays;i++)
        {
            var a=document.createElement("option");
            a.setAttribute("value",i);
            a.innerHTML=i;
            dateOption.appendChild(a);
        }
    }
}
function openTaskList()
{
    monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
    date=document.getElementById("date").value;
    monthNumber=document.getElementById("month").value;
    month=monthList[monthNumber-1];
    document.getElementById("tasks").style.display="block";
    if(data[monthNumber]==null)
    {
            data[monthNumber]= {}
    }
    if(data[monthNumber][date]==null)
    {
            data[monthNumber][date]=[];
    }
    var taskList=document.getElementById("tasks-list");
    taskList.innerHTML='';
    var tasks=data[monthNumber][date];
    console.log(tasks);
    for(i=0;i<tasks.length;i++)
    {
        var task=document.createElement("div");
        task.innerHTML=tasks[i]["Title"];
        task.setAttribute("class","modal-list-elem");
        task.setAttribute("data-ind",i);
        task.addEventListener("click",function(event){
                var y=event.target.dataset.ind;
                openTaskDetail(y);
        });
        taskList.appendChild(task);        
    }    
}
function openTaskDetail(taskId)
{
        document.getElementById("task-detail-window").style.display="block";
        date=document.getElementById("date").value;
        monthNumber=document.getElementById("month").value;
        document.getElementById("task-title-dis").innerHTML=data[monthNumber][date][taskId]["Title"];
        document.getElementById("task-description-dis").innerHTML=data[monthNumber][date][taskId]["Description"];
        document.getElementById("delete-task").setAttribute("data-ind",taskId);
}
function closeTaskDetail()
{
        document.getElementById("task-detail-window").style.display="none";
}
function closeTaskList()
{
    document.getElementById("tasks").style.display="none";
}
function clearStorage()
{
        localStorage.clear();
        data={};
}
function openAddNew()
{
        document.getElementById("add-task-window").style.display="block";
}
function closeAddTaskList()
{
    document.getElementById("add-task-window").style.display="none";
}
function addTask()
{
        var temp=new Object();
        date=document.getElementById("date").value;
        monthNumber=document.getElementById("month").value;
        temp["Title"]=document.getElementById("task-title").value;
        temp["Description"]=document.getElementById("description").value;
        data[monthNumber][date].push(temp);
        localStorage.setItem("data",JSON.stringify(data));
        document.getElementById("add-task-window").style.display="none";
        document.getElementById("task-title").value='';
        document.getElementById("description").value='';
        openTaskList();
}
window.onload = (event) =>
{
    var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var monthOption=document.getElementById("month");
    var dateOption=document.getElementById("date");
    for(i=1;i<=month.length;i++)
    {
        var a=document.createElement("option");
        a.setAttribute("value",i);
        a.innerHTML=month[i-1];
        monthOption.appendChild(a);
    }
    monthOption.addEventListener("change",addDates);
    dateOption.addEventListener("change",openTaskList);
    document.getElementById("tasks-close").addEventListener("click",closeTaskList);
    document.getElementById("Remove-All-Tasks").addEventListener("click",clearStorage);
    document.getElementById("add-new").addEventListener("click",openAddNew);
    document.getElementById("add-task-close").addEventListener("click",closeAddTaskList);
    document.getElementById("task-detail-close").addEventListener("click",closeTaskDetail);
    document.getElementById("create").addEventListener("click",addTask);
    document.getElementById("get-list").addEventListener("click",openTaskList);
    document.getElementById("delete-task").addEventListener("click",function(e){
        console.log("deleting");
        date=document.getElementById("date").value;
        monthNumber=document.getElementById("month").value;
        var i=e.target.dataset.ind;
        console.log(typeof i);
        console.log("month: "+monthNumber);
        console.log("date:"+ date);
        console.log(i);
        data[monthNumber][date].splice(i,1);
        localStorage.setItem("data",JSON.stringify(data));
        closeTaskDetail();
        openTaskList();
    })
}