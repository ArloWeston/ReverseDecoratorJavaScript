// we define all our functions here:


//get the data from form
function getDataFromForm(next){
    return function(dataObj){
        if(!dataObj.hasError){
            dataObj.dtAddDueDate = document.getElementById("dtAddDueDate").value;
            dataObj.txtAddTask = document.getElementById("txtAddTask").value;
        }
        
        if(next){
            next(dataObj);
        }
    };

}

//write it to the table
function addToTable(next){
    return function(dataObj){
        if(!dataObj.hasError){
            var newRow = document.createElement("tr");
            var ckCol = document.createElement("td");
            var ck = document.createElement("input");
            ck.type = "checkbox";
            ckCol.appendChild(ck)
            newRow.appendChild(ckCol);

            var dtCol = document.createElement("td");
            dtCol.innerText = dataObj.dtAddDueDate;
            newRow.appendChild(dtCol);

            var taskCol = document.createElement("td");
            taskCol.innerText = dataObj.txtAddTask;
            newRow.appendChild(taskCol);

            var tblBody = document.getElementById("tblBody");
            tblBody.appendChild(newRow);
        }
        
        if(next){
            next(dataObj);
        }
    };
}

//sort the table on Due Date
function sortTableOnDueDate(next){
    return function(dataObj){

        var rows = document.getElementById("tblBody").rows;
        var numSorted;
        do {
            numSorted = 0;
            for (i = 0; i < rows.length; i++) {

                var currEl = rows[i];
                var nextEl = currEl.nextElementSibling;
                if ((nextEl) && (new Date(currEl.cells[1].innerText) > new Date(nextEl.cells[1].innerText))) {

                    document.getElementById("tblBody").insertBefore(nextEl, currEl);
                    numSorted++;
                }
            }

        } while (numSorted > 0);

        if(next){
            next(dataObj);
        }
    };
}


//add error handler
function addErrHandler(next) {
    return function (dataObj) {
        dataObj.err = {
            hasError: false,
            message: ""
        }
        try {
            if (next) {
                next(dataObj);
            }
        } catch (err) {
            dataObj.err.hasError = true;
            dataObj.err.message = err.message;
            next(dataObj);
        }

    };
}


//show error to user
function showErrorToUser(next){
   
    return function(dataObj){
        if(dataObj.err.hasError){
            alert("ERROR: " + dataObj.err.message);
        }
        if(next){
            next(dataObj);
        }
    };
}