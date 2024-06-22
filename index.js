/****** Get today **********************/
const today = new Date();
const todayDate = today.getDate();
const todayMonth = today.getMonth()+1;
const todayYear = today.getFullYear();

/*****Get Date from the form */
const birthDate = document.getElementById("date");
const birthMonth = document.getElementById("month");
const birthYear = document.getElementById("year");
// make the inputs a proper date
const birthDay = new Date();

/**** get the difference in date HTML*/
const age = document.getElementsByTagName("span");

/**** Add Event listener to the button *****/
const btn = document.getElementById("calculate");

btn.addEventListener("click",calculateAge);

/*** function to calculate age *****/
function calculateAge(){
    birthDay.setFullYear(birthYear.value,birthMonth.value-1,birthDate.value);
    // flags to check proper input
    let checkYear, checkMonth, checkDate = false;

    // validate year
    if(birthYear.value === (null || undefined || "")){
        addReqd(birthYear,"This field is required");
    } else if(birthDay > today){
        addReqd(birthYear,"Must be in the past");
    } else {
        removeReqd(birthYear);
        checkYear = true;
    }

    //validate month
    if(birthMonth.value === (null || undefined || "")){
        addReqd(birthMonth,"This field is required");
    } else if(birthMonth.value < 1 || birthMonth.value > 12){
        addReqd(birthMonth, "Must be a valid month");
    } else {
        removeReqd(birthMonth);
        checkMonth = true;
    }

    // validate birthdate
    if(birthDate.value === null || birthDate.value === undefined || birthDate.value === ""){
        addReqd(birthDate,"This field is required");
    } else if(birthDate.value < 1 || birthDate.value > 31){
        addReqd(birthDate, "Must be a valid day");
    } else if(birthDate.value != birthDay.getDate()){
        addReqd(birthDate, "Must be a valid date");
    } else{
        removeReqd(birthDate);
        checkDate = true;
    }

    if(checkYear && checkMonth && checkDate){
        calculateAgeDiff();
    }
}


function addReqd(inputnode,msg){
        inputnode.nextElementSibling.innerHTML = msg;
        inputnode.classList.add("reqd");
        inputnode.previousElementSibling.classList.add("reqd");
        inputnode.nextElementSibling.classList.add("reqd");

        age[0].innerHTML = "-- ";
        age[1].innerHTML = "-- ";
        age[2].innerHTML = "-- ";
}

function removeReqd(inputnode){
        inputnode.nextElementSibling.innerHTML = "";
        inputnode.classList.remove("reqd");
        inputnode.previousElementSibling.classList.remove("reqd");
        inputnode.nextElementSibling.classList.remove("reqd");
}

function calculateAgeDiff() {
    let ageYears, ageMonths, ageDays;

    age[0].innerHTML = "-- ";
        age[1].innerHTML = "-- ";
        age[2].innerHTML = "-- ";

        if(birthMonth.value <= todayMonth){
            ageYears =  todayYear - birthYear.value;
            if(birthDate.value <=todayDate){
                ageMonths = todayMonth - birthMonth.value;
                ageDays = todayDate - birthDate.value;
            } else {
                ageMonths = todayMonth - birthMonth.value - 1;
                ageDays = 30 - birthDate.value + todayDate;
            }
            
        } else{
            ageYears = todayYear - birthYear.value - 1;
            if(birthDate.value <=todayDate){
                ageMonths = 12 - birthMonth.value + todayMonth;
                ageDays = todayDate - birthDate.value;
            } else{
            ageMonths = 11 - birthMonth.value + todayMonth;
            ageDays = 30 - birthDate.value + todayDate;
            }
        }
        let id1, id2, id3 = null;
        let numYears = 0;
        let numMonths = 0;
        let numDays = 0;
        clearInterval(id1);
        clearInterval(id2);
        clearInterval(id3);
        id1 = setInterval(animateYears,20);
        function animateYears(){
            if(numYears===ageYears){
                clearInterval(id1);
            } else{
                numYears ++;
            }
            age[0].innerHTML = numYears + " ";
        }

        id2 = setInterval(animateMonths,60);

        function animateMonths(){
            if(numMonths === ageMonths){
                clearInterval(id2);
            } else{
                numMonths ++;
            }
            age[1].innerHTML = numMonths + " ";
        }

        id3 = setInterval(animateDays,40);

        function animateDays(){
            if(numDays === ageDays){
                clearInterval(id3);
            } else{
                numDays ++;
            }
            age[2].innerHTML = numDays + " ";
        }
}