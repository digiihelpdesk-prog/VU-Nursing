// Age Calculate
function calculateAge() {
    var dobVal = document.getElementById("dob").value;
    if (!dobVal) {
        document.getElementById("age").value = "";
        return;
    }
    var dob   = new Date(dobVal);
    var today = new Date();
    var age   = today.getFullYear() - dob.getFullYear();
    var m     = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    document.getElementById("age").value = age;
}


// Address Sync
function syncAddress() {
    var check = document.getElementById("copyCheck");
    if (check.checked) {
        document.getElementById("chouse").value    = document.getElementById("phouse").value;
        document.getElementById("carea").value     = document.getElementById("parea").value;
        document.getElementById("cdistrict").value = document.getElementById("pdistrict").value;
        document.getElementById("ccity").value     = document.getElementById("pcity").value;
        document.getElementById("cstate").value    = document.getElementById("pstate").value;
        document.getElementById("cpin").value      = document.getElementById("ppin").value;
    } else {
        document.getElementById("chouse").value    = "";
        document.getElementById("carea").value     = "";
        document.getElementById("cdistrict").value = "";
        document.getElementById("ccity").value     = "";
        document.getElementById("cstate").value    = "";
        document.getElementById("cpin").value      = "";
    }
}

//Calculate 10th percentage// 
function calc10() {
    var max = parseFloat(document.getElementById("maxMarks10").value);
    var obt = parseFloat(document.getElementById("obtMarks10").value);
    if (!isNaN(max) && !isNaN(obt) && max > 0) {
        document.getElementById("per10").value = ((obt / max) * 100).toFixed(2);
    } else {
        document.getElementById("per10").value = "";
    }
}


function generatePDF(appNumber){

let name = document.querySelector("[name='fullName']").value;
let mobile = document.querySelector("[name='mobile']").value;

let html = `<h2>GNM Nursing Application</h2>
  <p>Application No: ${appNumber}</p>
  <p>Name: ${name}</p>
  <p>Mobile: ${mobile}</p>`;

let win = window.open("");

win.document.write(html);

win.print();

}

document.getElementById("photo").addEventListener("change", function(event){
  var reader = new FileReader();
  reader.onload = function(){
    document.getElementById("previewPhoto").src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
});

// PHOTO VALIDATION (50KB)
document.getElementById("photoUpload").addEventListener("change", function(){

let file = this.files[0];

if(file){
let size = file.size / 1024; // convert to KB

if(size > 50){
alert("Photo size must be less than 50 KB");
this.value = "";
return;
}

let reader = new FileReader();
reader.onload = function(e){
document.getElementById("photoPreview").src = e.target.result;
}

reader.readAsDataURL(file);
}

});

["marksheet10", "marksheet12", "aadharUpload"].forEach(id => {
    document.getElementById(id).addEventListener("change", function() {
        if (this.files[0] && this.files[0].size / 1024 > 50) {
            alert("File must be less than 50 KB");
            this.value = "";
        }
    });
});


// SIGNATURE VALIDATION (20KB)
document.getElementById("signatureUpload").addEventListener("change", function(){

let file = this.files[0];

if(file){
let size = file.size / 1024; // convert to KB

if(size > 20){
alert("Signature size must be less than 20 KB");
this.value = "";
return;
}

let reader = new FileReader();
reader.onload = function(e){
document.getElementById("signPreview").src = e.target.result;
}

reader.readAsDataURL(file);
}

});

document.getElementById("photo").addEventListener("change", function(){
let reader = new FileReader();

reader.onload = function(e){
document.getElementById("photoPreview").src = e.target.result;
}

reader.readAsDataURL(this.files[0]);
});

function calculatePCB() {

let physics = parseFloat(document.getElementById("physics").value) || 0;
let chemistry = parseFloat(document.getElementById("chemistry").value) || 0;
let biology = parseFloat(document.getElementById("biology").value) || 0;

let total = physics + chemistry + biology;

let percentage = (total / 300) * 100;

document.getElementById("percentage").value = percentage.toFixed(2);

}

function validateForm(){

let physics = parseFloat(document.getElementById("physics").value) || 0;
let chemistry = parseFloat(document.getElementById("chemistry").value) || 0;
let biology = parseFloat(document.getElementById("biology").value) || 0;
let english = parseFloat(document.getElementById("english").value) || 0;

let total = physics + chemistry + biology;
let percentage = (total/300)*100;

if(percentage < 45){
alert("PCB percentage must be at least 45%");
return false;
}

if(english < 45){
alert("English marks must be at least 45");
return false;
}

return true;

}



function makePayment(){

// simulate payment success

let transactionId = "TXN" + Math.floor(Math.random()*1000000);

document.querySelector('[name="transactionId"]').value = transactionId;
document.querySelector('[name="transactionDate"]').value = new Date().toISOString().split('T')[0];

alert("Payment Successful!");

document.getElementById("downloadSection").style.display="block";

}

function startPayment(){
    
    var options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: 100000,           // ← Fix: was 1000, should be 100000 paise
        currency: "INR",
        name: "Vivek University",
        description: "GNM Nursing Application Fee",
        handler: function (response){

            // ✅ Store payment ID
            saveApplication(response.razorpay_payment_id);
            document.querySelector('[name="transactionId"]').value   = response.razorpay_payment_id;
            document.querySelector('[name="transactionDate"]').value = new Date().toISOString().split('T')[0];
            populatePDFTemplate(response.razorpay_payment_id);
            document.getElementById("downloadSection").style.display = "block";
            document.getElementById("paymentSection").style.display  = "none";
            alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        }
    };
    var rzp = new Razorpay(options);
    rzp.open();
}


function saveApplication(paymentId){

let form = document.getElementById("nursingForm");

let formData = new FormData(form);

formData.append("paymentId",paymentId);

fetch("https://script.google.com/macros/s/AKfycbxJ64ADtP_hqE8HLPVv83lTSz8a_yYZ-Pd_Cf18lF3gd6ipy6wfyPVmA-0Z5PpgYVw/exec",{
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{

alert("Application Submitted\nApplication No: "+data.appNumber);

generatePDF(data.appNumber);

sendEmail(data.email,data.appNumber);

});

}

function sendEmail(email,appId){

MailApp.sendEmail({

to: email,

subject: "GNM Nursing Application Submitted",

htmlBody:
"Dear Student,<br><br>"+
"Your application has been submitted.<br><br>"+
"<b>Application Number:</b> "+appId+"<br><br>"+
"Vivek University<br>Department of Nursing"

});

}

function downloadApplication(){
    var appId    = document.querySelector("[name='applicationId']").value;
    var template = document.getElementById("pdfDownloadTemplate");

    template.style.display = "block"; // briefly show for html2pdf

    var opt = {
        margin:      [8, 8, 8, 8],
        filename:    "GNM_Application_" + appId + ".pdf",
        image:       { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF:       { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(template).save().then(function(){
        template.style.display = "none"; // hide again after download
    });
}

function handleSubmit(event){
    event.preventDefault();

    // ✅ ADD THIS BLOCK AT THE TOP
    var errors = [];

    // Personal Details
    if(!document.querySelector("[name='fullName']").value.trim())       errors.push("Full Name");
    if(!document.querySelector("[name='fatherName']").value.trim())     errors.push("Father's Name");
    if(!document.querySelector("[name='motherName']").value.trim())     errors.push("Mother's Name");
    if(!document.querySelector("[name='gender']").value)                errors.push("Gender");
    if(!document.querySelector("[name='dob']").value)                   errors.push("Date of Birth");
    if(!document.querySelector("[name='mobile']").value.trim())         errors.push("Mobile Number");
    if(!document.querySelector("[name='email']").value.trim())          errors.push("Email Address");
    if(!document.querySelector("[name='aadhar']").value.trim())         errors.push("Aadhar Number");
    if(!document.querySelector("[name='category']").value)              errors.push("Category");

    // Permanent Address
    if(!document.getElementById("phouse").value.trim())                 errors.push("Permanent House/Village");
    if(!document.getElementById("parea").value.trim())                  errors.push("Permanent Area/Post Office");
    if(!document.getElementById("pdistrict").value.trim())              errors.push("Permanent District");
    if(!document.getElementById("pcity").value.trim())                  errors.push("Permanent City");
    if(!document.getElementById("pstate").value.trim())                 errors.push("Permanent State");
    if(!document.getElementById("ppin").value.trim())                   errors.push("Permanent Pincode");

    // Correspondence Address
    if(!document.getElementById("chouse").value.trim())                 errors.push("Correspondence House/Village");
    if(!document.getElementById("carea").value.trim())                  errors.push("Correspondence Area/Post Office");
    if(!document.getElementById("cdistrict").value.trim())              errors.push("Correspondence District");
    if(!document.getElementById("ccity").value.trim())                  errors.push("Correspondence City");
    if(!document.getElementById("cstate").value.trim())                 errors.push("Correspondence State");
    if(!document.getElementById("cpin").value.trim())                   errors.push("Correspondence Pincode");

    // Academic 10th
    if(!document.querySelector("[name='exam10']").value.trim())         errors.push("10th Examination");
    if(!document.querySelector("[name='board10']").value.trim())        errors.push("10th Board/University");
    if(!document.querySelector("[name='school10']").value.trim())       errors.push("10th School");
    if(!document.querySelector("[name='year10']").value)                errors.push("10th Year of Passing");
    if(!document.querySelector("[name='maxMarks10']").value)            errors.push("10th Maximum Marks");
    if(!document.querySelector("[name='obtMarks10']").value)            errors.push("10th Obtained Marks");

    // Academic 12th
    if(!document.querySelector("[name='exam12']").value.trim())         errors.push("12th Examination");
    if(!document.querySelector("[name='board12']").value.trim())        errors.push("12th Board/University");
    if(!document.querySelector("[name='college12']").value.trim())      errors.push("12th College");
    if(!document.querySelector("[name='year12']").value)                errors.push("12th Year of Passing");
    if(!document.getElementById("physics").value)                       errors.push("Physics Marks");
    if(!document.getElementById("chemistry").value)                     errors.push("Chemistry Marks");
    if(!document.getElementById("biology").value)                       errors.push("Biology Marks");
    if(!document.getElementById("english").value)                       errors.push("English Marks");
    if(!document.querySelector("[name='subject12']").value)             errors.push("Subject");

    // Documents
    if(!document.getElementById("marksheet10").files[0])               errors.push("10th Marksheet");
    if(!document.getElementById("marksheet12").files[0])               errors.push("12th Marksheet");
    if(!document.getElementById("aadharUpload").files[0])              errors.push("Aadhar Card");
    if(!document.getElementById("photoUpload").files[0])               errors.push("Photo");
    if(!document.getElementById("signatureUpload").files[0])           errors.push("Signature");

    // ✅ If any errors, show them and STOP
    if(errors.length > 0){
        alert("⚠️ Please fill all mandatory fields:\n\n" + errors.join("\n"));
        return false;
    }
    // ✅ END OF VALIDATION BLOCK

    // your existing code continues below...
    if(!validateForm()) return false;

    var appId  = "GNM" + Math.floor(Math.random()*100000);
    var appDate = new Date().toISOString().split('T')[0];
    document.querySelector('[name="applicationId"]').value  = appId;
    document.querySelector('[name="applicationDate"]').value = appDate;
    document.getElementById("paymentSection").style.display = "block";
    alert("Form submitted. Please proceed to payment.");
    return false;
}

    function populatePDFTemplate(paymentId){
    var f = document.getElementById("nursingForm");
    var g = function(name){
        var el = f.querySelector("[name='" + name + "']");
        return el ? el.value : "";
    };

    // Meta
    document.getElementById("pdf_appId").textContent   = g("applicationId");
    document.getElementById("pdf_appDate").textContent  = g("applicationDate");
    document.getElementById("pdf_payId").textContent    = paymentId;

    // Personal
    document.getElementById("pdf_fullName").textContent   = g("fullName");
    document.getElementById("pdf_fatherName").textContent = g("fatherName");
    document.getElementById("pdf_motherName").textContent = g("motherName");
    document.getElementById("pdf_gender").textContent     = g("gender");
    document.getElementById("pdf_dob").textContent        = g("dob");
    document.getElementById("pdf_age").textContent        = g("age");
    document.getElementById("pdf_mobile").textContent     = g("mobile");
    document.getElementById("pdf_email").textContent      = g("email");
    document.getElementById("pdf_aadhar").textContent     = g("aadhar");
    document.getElementById("pdf_category").textContent   = g("category");

    // Permanent Address
    document.getElementById("pdf_phouse").textContent    = g("phouse");
    document.getElementById("pdf_parea").textContent     = g("parea");
    document.getElementById("pdf_pdistrict").textContent = g("pdistrict");
    document.getElementById("pdf_pcity").textContent     = g("pcity");
    document.getElementById("pdf_pstate").textContent    = g("pstate");
    document.getElementById("pdf_ppin").textContent      = g("ppin");

    // Correspondence Address
    document.getElementById("pdf_chouse").textContent    = g("chouse");
    document.getElementById("pdf_carea").textContent     = g("carea");
    document.getElementById("pdf_cdistrict").textContent = g("cdistrict");
    document.getElementById("pdf_ccity").textContent     = g("ccity");
    document.getElementById("pdf_cstate").textContent    = g("cstate");
    document.getElementById("pdf_cpin").textContent      = g("cpin");

    // 10th
    document.getElementById("pdf_exam10").textContent     = g("exam10");
    document.getElementById("pdf_board10").textContent    = g("board10");
    document.getElementById("pdf_school10").textContent   = g("school10");
    document.getElementById("pdf_year10").textContent     = g("year10");
    document.getElementById("pdf_maxMarks10").textContent = g("maxMarks10");
    document.getElementById("pdf_obtMarks10").textContent = g("obtMarks10");
    document.getElementById("pdf_percent10").textContent  = g("percent10");

    // 12th
    document.getElementById("pdf_exam12").textContent    = g("exam12");
    document.getElementById("pdf_board12").textContent   = g("board12");
    document.getElementById("pdf_college12").textContent = g("college12");
    document.getElementById("pdf_year12").textContent    = g("year12");
    document.getElementById("pdf_physics").textContent   = g("phymarks");
    document.getElementById("pdf_chemistry").textContent = g("chemarks");
    document.getElementById("pdf_biology").textContent   = g("biomarks");
    document.getElementById("pdf_english").textContent   = g("engmarks");
    document.getElementById("pdf_pcbPercent").textContent= document.getElementById("percentage").value;
    document.getElementById("pdf_subject").textContent   = g("subject12");

    // Photo & Signature
    var photoSrc = document.getElementById("photoPreview").src;
    var signSrc  = document.getElementById("signPreview").src;
    if(photoSrc && photoSrc.startsWith("data:"))
        document.getElementById("pdf_photo").src = photoSrc;
    if(signSrc && signSrc.startsWith("data:"))
        document.getElementById("pdf_sign").src = signSrc;

    // QR Code
    document.getElementById("pdf_qrcode").innerHTML = "";
    new QRCode(document.getElementById("pdf_qrcode"), {
        text: "App: " + g("applicationId") + " | Pay: " + paymentId + " | Vivek University",
        width: 80,
        height: 80
    });
}

