

var addToDo = function(){

    // we compose here:
    var runMe = null;
    runMe = showErrorToUser(runMe);
    runMe = sortTableOnDueDate(runMe);
    runMe = addToTable(runMe);
    runMe = getDataFromForm(runMe);
    runMe = addErrHandler(runMe);

    dataObj = {};
    // run here:
    runMe(dataObj);

};