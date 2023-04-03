const submit = document.querySelector(".submit-btn");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

submit.addEventListener("click", (e) => {
   e.preventDefault();

   const day = document.querySelector("#day").value;
   const month = document.querySelector("#month").value;
   const year = document.querySelector("#year").value;

   const dayError = document.querySelector(".day-error");
   const monthError = document.querySelector(".month-error");
   const yearError = document.querySelector(".year-error");

   const labels = document.querySelectorAll("label");
   const inputs = document.querySelectorAll("input");

   var isValid = true;
   var errorColor = "hsl(0, 100%, 67%)";
   var regularLabelColor = "hsl(0, 1%, 44%)";
   var regularBorderColor = "hsl(0, 0%, 86%)";

   // reset previous error messages
   dayError.innerHTML = "";
   monthError.innerHTML = "";
   yearError.innerHTML = "";

   // reset colors
   resetLabelsColors(labels, regularLabelColor);
   resetBordersColors(inputs, regularBorderColor);

   if (day === "") {
      dayError.innerHTML = "This field is required";
      isValid = false;
   }
   
   if (month === "") {
      monthError.innerHTML = "This field is required";
      isValid = false;
   }
   
   if (year === "") {
      yearError.innerHTML = "This field is required";
      isValid = false;
   }

   if (!isValid) {
      resetLabelsColors(labels, errorColor);
      resetBordersColors(inputs, errorColor);
      return;
   }

   if (day < 1 || day > 31) {
      dayError.innerHTML = "Must be a valid day";
      isValid = false;
   }

   if (month < 1 || month > 12) {
      monthError.innerHTML = "Must be a valid month";
      isValid = false;
   }

   if (year > currentYear) {
      yearError.innerHTML = "Must be in the past";
      isValid = false;
   }

   if (!isValid) {
      resetLabelsColors(labels, errorColor);
      resetBordersColors(inputs, errorColor);
      return;
   }

   if (isValidDate(day, month, year)) {
      var birthDate = year + "-"
                    + singleDigitToDoubleDigits(month) + "-"
                    + singleDigitToDoubleDigits(day);
      
      if (new Date(birthDate).getTime() > currentDate.getTime()) {
         yearError.innerHTML = "Must be in the past";
         resetLabelsColors(labels, errorColor);
         resetBordersColors(inputs, errorColor);
      } else {
         var age = calculateAge(birthDate);
         document.querySelector(".days").innerHTML = age.days;
         document.querySelector(".months").innerHTML = age.months;
         document.querySelector(".years").innerHTML = age.years;
      }
   } else {
      dayError.innerHTML = "Must be a valid day";
      resetLabelsColors(labels, errorColor);
      resetBordersColors(inputs, errorColor);
   }
});

function resetLabelsColors(labels, newColor) {
   labels.forEach(label => {
      label.style.color = newColor;
   });

   document.querySelector(".days").innerHTML = "--";
   document.querySelector(".months").innerHTML = "--";
   document.querySelector(".years").innerHTML = "--";
}

function resetBordersColors(inputs, newColor) {
   inputs.forEach(input => {
      input.style.borderColor = newColor;
   });
}

function isValidDate(day, month, year) {
   var maxDays = new Date(year, month, 0).getDate();
   return (day <= maxDays);
}

function singleDigitToDoubleDigits(number) {
   if (number.length > 1) {
      return number
   } else {
      return number.toString().padStart(2, "0");
   }
}

function calculateAge(birthdate) {
   var today = new Date();
   var birthDate = new Date(birthdate);
   var years = today.getFullYear() - birthDate.getFullYear();
   var months = today.getMonth() - birthDate.getMonth();
   var days = today.getDate() - birthDate.getDate();
 
   if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
   }
 
   if (days < 0) {
      var prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days = prevMonthLastDay - birthDate.getDate() + today.getDate();
      months--;

      if (months < 0) {
         years--;
         months += 12;
      }
   }
 
   return {
      years: years,
      months: months,
      days: days
   };
}
