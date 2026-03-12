// ============================================
// 1. AGE CALCULATOR
// ============================================
function calculateAge() {
    var dobVal = document.getElementById("dob").value;
    if (!dobVal) { document.getElementById("age").value = ""; return; }
    var dob   = new Date(dobVal);
    var today = new Date();
    var age   = today.getFullYear() - dob.getFullYear();
    var m     = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    document.getElementById("age").value = age;
}

// ============================================
// 2. ADDRESS SYNC
// ============================================
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

// ============================================
// 3. 10th PERCENTAGE
// ============================================
function calc10() {
    var max = parseFloat(document.getElementById("maxMarks10").value);
    var obt = parseFloat(document.getElementById("obtMarks10").value);
    if (!isNaN(max) && !isNaN(obt) && max > 0) {
        document.getElementById("per10").value = ((obt / max) * 100).toFixed(2);
    } else {
        document.getElementById("per10").value = "";
    }
}

// ============================================
// 4. 12th PCB PERCENTAGE
// ============================================
function calculatePCB() {
    var phy = parseFloat(document.getElementById("physics").value)   || 0;
    var che = parseFloat(document.getElementById("chemistry").value) || 0;
    var bio = parseFloat(document.getElementById("biology").value)   || 0;
    document.getElementById("percentage").value = (((phy + che + bio) / 300) * 100).toFixed(2);
}

// ============================================
// 5. FILE VALIDATIONS
// ============================================
document.getElementById("photoUpload").addEventListener("change", function () {
    var file = this.files[0];
    if (!file) return;
    if (file.size / 1024 > 50) {
        alert("Photo must be less than 50 KB. Your file: " + (file.size/1024).toFixed(1) + " KB");
        this.value = ""; document.getElementById("photoPreview").style.display = "none"; return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.getElementById("photoPreview");
        img.src = e.target.result; img.style.display = "block";
    };
    reader.readAsDataURL(file);
});

document.getElementById("signatureUpload").addEventListener("change", function () {
    var file = this.files[0];
    if (!file) return;
    if (file.size / 1024 > 20) {
        alert("Signature must be less than 20 KB. Your file: " + (file.size/1024).toFixed(1) + " KB");
        this.value = ""; document.getElementById("signPreview").style.display = "none"; return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.getElementById("signPreview");
        img.src = e.target.result; img.style.display = "block";
    };
    reader.readAsDataURL(file);
});

["marksheet10", "marksheet12", "aadharUpload"].forEach(function(id) {
    document.getElementById(id).addEventListener("change", function () {
        if (this.files[0] && this.files[0].size / 1024 > 50) {
            alert("File must be less than 50 KB"); this.value = "";
        }
    });
});

// ============================================
// 6. FORM VALIDATION
// ============================================
function validateForm() {
    var phy = parseFloat(document.getElementById("physics").value)   || 0;
    var che = parseFloat(document.getElementById("chemistry").value) || 0;
    var bio = parseFloat(document.getElementById("biology").value)   || 0;
    var eng = parseFloat(document.getElementById("english").value)   || 0;
    var pcbPct = ((phy + che + bio) / 300) * 100;
    if (pcbPct < 45) {
        alert("❌ PCB percentage is " + pcbPct.toFixed(2) + "%\nMinimum 45% required in PCB.");
        return false;
    }
    if (eng < 45) {
        alert("❌ English marks are " + eng + "\nMinimum 45 marks required in English.");
        return false;
    }
    return true;
}

// ============================================
// 7. HANDLE FORM SUBMIT
// ============================================
function handleSubmit(event) {
    event.preventDefault();
    var errors = [];

    if (!document.querySelector("[name='fullName']").value.trim())    errors.push("Full Name");
    if (!document.querySelector("[name='fatherName']").value.trim())  errors.push("Father's Name");
    if (!document.querySelector("[name='motherName']").value.trim())  errors.push("Mother's Name");
    if (!document.querySelector("[name='gender']").value)             errors.push("Gender");
    if (!document.querySelector("[name='dob']").value)                errors.push("Date of Birth");
    if (!document.querySelector("[name='mobile']").value.trim())      errors.push("Mobile Number");
    if (!document.querySelector("[name='email']").value.trim())       errors.push("Email Address");
    if (!document.querySelector("[name='aadhar']").value.trim())      errors.push("Aadhar Number");
    if (!document.querySelector("[name='category']").value)           errors.push("Category");
    if (!document.getElementById("phouse").value.trim())              errors.push("Permanent House/Village");
    if (!document.getElementById("parea").value.trim())               errors.push("Permanent Area/Post Office");
    if (!document.getElementById("pdistrict").value.trim())           errors.push("Permanent District");
    if (!document.getElementById("pcity").value.trim())               errors.push("Permanent City");
    if (!document.getElementById("pstate").value.trim())              errors.push("Permanent State");
    if (!document.getElementById("ppin").value.trim())                errors.push("Permanent Pincode");
    if (!document.getElementById("chouse").value.trim())              errors.push("Correspondence House/Village");
    if (!document.getElementById("carea").value.trim())               errors.push("Correspondence Area/Post Office");
    if (!document.getElementById("cdistrict").value.trim())           errors.push("Correspondence District");
    if (!document.getElementById("ccity").value.trim())               errors.push("Correspondence City");
    if (!document.getElementById("cstate").value.trim())              errors.push("Correspondence State");
    if (!document.getElementById("cpin").value.trim())                errors.push("Correspondence Pincode");
    if (!document.querySelector("[name='exam10']").value.trim())      errors.push("10th Examination");
    if (!document.querySelector("[name='board10']").value.trim())     errors.push("10th Board/University");
    if (!document.querySelector("[name='school10']").value.trim())    errors.push("10th School");
    if (!document.querySelector("[name='year10']").value)             errors.push("10th Year of Passing");
    if (!document.getElementById("maxMarks10").value)                 errors.push("10th Maximum Marks");
    if (!document.getElementById("obtMarks10").value)                 errors.push("10th Obtained Marks");
    if (!document.querySelector("[name='exam12']").value.trim())      errors.push("12th Examination");
    if (!document.querySelector("[name='board12']").value.trim())     errors.push("12th Board/University");
    if (!document.querySelector("[name='college12']").value.trim())   errors.push("12th College");
    if (!document.querySelector("[name='year12']").value)             errors.push("12th Year of Passing");
    if (!document.getElementById("physics").value)                    errors.push("Physics Marks");
    if (!document.getElementById("chemistry").value)                  errors.push("Chemistry Marks");
    if (!document.getElementById("biology").value)                    errors.push("Biology Marks");
    if (!document.getElementById("english").value)                    errors.push("English Marks");
    if (!document.querySelector("[name='subject12']").value)          errors.push("Subject");
    if (!document.getElementById("marksheet10").files[0])            errors.push("10th Marksheet");
    if (!document.getElementById("marksheet12").files[0])            errors.push("12th Marksheet");
    if (!document.getElementById("aadharUpload").files[0])           errors.push("Aadhar Card");
    if (!document.getElementById("photoUpload").files[0])            errors.push("Photo");
    if (!document.getElementById("signatureUpload").files[0])        errors.push("Signature");

    if (errors.length > 0) {
        alert("⚠️ Please fill all mandatory fields:\n\n" + errors.join("\n"));
        return false;
    }
    if (!validateForm()) return false;

    var appId   = "GNM" + Math.floor(Math.random() * 100000);
    var appDate = new Date().toISOString().split("T")[0];
    document.querySelector("[name='applicationId']").value   = appId;
    document.querySelector("[name='applicationDate']").value = appDate;

    openPaymentPopup();
    return false;
}

// ============================================
// 8. PAYMENT POPUP
// ============================================
function openPaymentPopup() {
    document.getElementById("popupAppId").textContent = document.querySelector("[name='applicationId']").value;
    document.getElementById("popupName").textContent  = document.querySelector("[name='fullName']").value;
    var popup = document.getElementById("paymentPopup");
    popup.style.display = "flex";
}

function closePaymentPopup() {
    document.getElementById("paymentPopup").style.display = "none";
}

// Close popup on backdrop click
document.getElementById("paymentPopup").addEventListener("click", function(e) {
    if (e.target === this) closePaymentPopup();
});

// ============================================
// 9. RAZORPAY PAYMENT
// ============================================
function startPayment() {
    var options = {
        key:         "rzp_live_SPrxmYjVlsaVLd",
        amount:      100000,
        currency:    "INR",
        name:        "Vivek University",
        description: "GNM Nursing Application Fee",
        prefill: {
            name:    document.querySelector("[name='fullName']").value,
            email:   document.querySelector("[name='email']").value,
            contact: document.querySelector("[name='mobile']").value
        },
        theme: { color: "#1a2c5b" },
        handler: function (response) {
            closePaymentPopup();
            var payId   = response.razorpay_payment_id;
            var txnDate = new Date().toISOString().split("T")[0];
            document.querySelector("[name='transactionId']").value   = payId;
            document.querySelector("[name='transactionDate']").value = txnDate;

            // 1. Fill the hidden PDF template
            populatePDFTemplate(payId);

            // 2. Show the download section
            document.getElementById("downloadSection").style.display = "block";
            document.getElementById("downloadSection").scrollIntoView({ behavior: "smooth" });

            // 3. Auto-download to student + upload to Drive & Sheet
            autoDownloadAndSave(payId);
        },
        modal: {
            ondismiss: function () {
                alert("Payment cancelled. Please try again.");
            }
        }
    };
    new Razorpay(options).open();
}

// ============================================
// 10. POPULATE PDF TEMPLATE
// ============================================
function populatePDFTemplate(paymentId) {
    var f = document.getElementById("nursingForm");
    function g(name) { var el = f.querySelector("[name='" + name + "']"); return el ? el.value : ""; }

    document.getElementById("pdf_appId").textContent    = g("applicationId");
    document.getElementById("pdf_appDate").textContent  = g("applicationDate");
    document.getElementById("pdf_payId").textContent    = paymentId;
    document.getElementById("pdf_fullName").textContent   = g("fullName");
    document.getElementById("pdf_fatherName").textContent = g("fatherName");
    document.getElementById("pdf_motherName").textContent = g("motherName");
    document.getElementById("pdf_gender").textContent     = g("gender");
    document.getElementById("pdf_dob").textContent        = g("dob");
    document.getElementById("pdf_age").textContent        = document.getElementById("age").value;
    document.getElementById("pdf_mobile").textContent     = g("mobile");
    document.getElementById("pdf_email").textContent      = g("email");
    document.getElementById("pdf_aadhar").textContent     = g("aadhar");
    document.getElementById("pdf_category").textContent   = g("category");
    document.getElementById("pdf_phouse").textContent     = document.getElementById("phouse").value;
    document.getElementById("pdf_parea").textContent      = document.getElementById("parea").value;
    document.getElementById("pdf_pdistrict").textContent  = document.getElementById("pdistrict").value;
    document.getElementById("pdf_pcity").textContent      = document.getElementById("pcity").value;
    document.getElementById("pdf_pstate").textContent     = document.getElementById("pstate").value;
    document.getElementById("pdf_ppin").textContent       = document.getElementById("ppin").value;
    document.getElementById("pdf_chouse").textContent     = document.getElementById("chouse").value;
    document.getElementById("pdf_carea").textContent      = document.getElementById("carea").value;
    document.getElementById("pdf_cdistrict").textContent  = document.getElementById("cdistrict").value;
    document.getElementById("pdf_ccity").textContent      = document.getElementById("ccity").value;
    document.getElementById("pdf_cstate").textContent     = document.getElementById("cstate").value;
    document.getElementById("pdf_cpin").textContent       = document.getElementById("cpin").value;
    document.getElementById("pdf_exam10").textContent     = g("exam10");
    document.getElementById("pdf_board10").textContent    = g("board10");
    document.getElementById("pdf_school10").textContent   = g("school10");
    document.getElementById("pdf_year10").textContent     = g("year10");
    document.getElementById("pdf_maxMarks10").textContent = document.getElementById("maxMarks10").value;
    document.getElementById("pdf_obtMarks10").textContent = document.getElementById("obtMarks10").value;
    document.getElementById("pdf_percent10").textContent  = document.getElementById("per10").value;
    document.getElementById("pdf_exam12").textContent     = g("exam12");
    document.getElementById("pdf_board12").textContent    = g("board12");
    document.getElementById("pdf_college12").textContent  = g("college12");
    document.getElementById("pdf_year12").textContent     = g("year12");
    document.getElementById("pdf_physics").textContent    = document.getElementById("physics").value;
    document.getElementById("pdf_chemistry").textContent  = document.getElementById("chemistry").value;
    document.getElementById("pdf_biology").textContent    = document.getElementById("biology").value;
    document.getElementById("pdf_english").textContent    = document.getElementById("english").value;
    document.getElementById("pdf_pcbPercent").textContent = document.getElementById("percentage").value + "%";
    document.getElementById("pdf_subject").textContent    = g("subject12");

    var photoImg = document.getElementById("photoPreview");
    if (photoImg && photoImg.src && photoImg.src.startsWith("data:"))
        document.getElementById("pdf_photo").src = photoImg.src;

    var signImg = document.getElementById("signPreview");
    if (signImg && signImg.src && signImg.src.startsWith("data:"))
        document.getElementById("pdf_sign").src = signImg.src;

    document.getElementById("pdf_qrcode").innerHTML = "";
    new QRCode(document.getElementById("pdf_qrcode"), {
        text:   "App: " + g("applicationId") + " | Pay: " + paymentId + " | Vivek University GNM",
        width:  80, height: 80
    });
}

// ============================================
// 11. AUTO DOWNLOAD + SAVE TO DRIVE & SHEET
//     Called immediately after payment success
//     - Downloads PDF to student's device
//     - Sends same PDF to Google Drive
//     - Saves all data + Drive link to Sheet
// ============================================
function autoDownloadAndSave(paymentId) {
    var appId    = document.querySelector("[name='applicationId']").value;
    var fileName = "GNM_Application_" + appId + ".pdf";
    var template = document.getElementById("pdfDownloadTemplate");

    // Show loading message in download section
    var dlSection = document.getElementById("downloadSection");
    dlSection.innerHTML = '<h3 style="color:#2c3e7a; font-family:Playfair Display,serif;">⏳ Generating your application PDF...</h3><p style="color:#666; margin-top:8px;">Please wait, do not close this page.</p>';

    template.style.display = "block";

    var pdfWorker = html2pdf().set({
        margin:      [8, 8, 8, 8],
        filename:    fileName,
        image:       { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF:       { unit: "mm", format: "a4", orientation: "portrait" }
    }).from(template);

    // Generate blob once, use it for BOTH student download AND Drive upload
    pdfWorker.outputPdf("blob").then(function(blob) {
        template.style.display = "none";

        // ── A. Auto-download to student's device ──────────────────
        var blobUrl = URL.createObjectURL(blob);
        var link    = document.createElement("a");
        link.href     = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 5000);

        // ── B. Convert blob to base64 for Drive upload ─────────────
        var reader = new FileReader();
        reader.onloadend = function() {
            var base64 = reader.result.split(",")[1];

            // Build form data object
            var formData = buildFormData(paymentId);
            formData.pdfBase64   = base64;
            formData.pdfFileName = fileName;

            // ── C. Send to Google Apps Script (Drive + Sheet) ──────
            fetch("https://script.google.com/macros/s/AKfycbwkY4uSCJ1GLj-yp2rVu6cVAXuc7siX4nbTQnGxjxvn2dvNNjqVSTRCEgBUTu8jraHT/exec",  // 🔴 Replace with your URL
            {
                method:  "POST",
                mode:    "no-cors",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(formData)
            })
            .then(function() {
                console.log("✅ PDF uploaded to Drive & data saved to Sheet");
            })
            .catch(function(err) {
                console.error("❌ Upload error:", err);
            });

            // ── D. Update download section UI ──────────────────────
            document.getElementById("downloadSection").innerHTML =
                '<h3 style="color:#00b894; font-family:Playfair Display,serif; margin-bottom:8px;">🎉 Payment Successful!</h3>' +
                '<p style="color:#5a6280; font-size:14px; margin-bottom:20px;">Your application has been submitted. PDF downloaded to your device.</p>' +
                '<button type="button" onclick="reDownloadApplication()" style="' +
                  'padding:13px 36px; background:linear-gradient(135deg,#0e1c3f,#2c3e7a); color:#fff;' +
                  'border:none; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer;' +
                  'font-family:DM Sans,sans-serif; box-shadow:0 4px 16px rgba(26,44,91,0.28);">' +
                  '⬇ Download Again' +
                '</button>' +
                '<p style="color:#aaa; font-size:11px; margin-top:12px;">Application ID: <strong style="color:#1a2c5b;">' + appId + '</strong> &nbsp;|&nbsp; Payment ID: <strong style="color:#1a2c5b;">' + paymentId + '</strong></p>';
        };
        reader.readAsDataURL(blob);
    });
}

// ============================================
// 12. RE-DOWNLOAD (if student clicks again)
// ============================================
function reDownloadApplication() {
    var appId    = document.querySelector("[name='applicationId']").value;
    var template = document.getElementById("pdfDownloadTemplate");
    template.style.display = "block";
    html2pdf().set({
        margin:      [8, 8, 8, 8],
        filename:    "GNM_Application_" + appId + ".pdf",
        image:       { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF:       { unit: "mm", format: "a4", orientation: "portrait" }
    }).from(template).save().then(function() {
        template.style.display = "none";
    });
}

// ============================================
// 13. BUILD FORM DATA OBJECT (shared helper)
// ============================================
function buildFormData(paymentId) {
    return {
        applicationId:   document.querySelector("[name='applicationId']").value,
        applicationDate: document.querySelector("[name='applicationDate']").value,
        paymentId:       paymentId,
        transactionDate: new Date().toISOString().split("T")[0],
        fullName:        document.querySelector("[name='fullName']").value,
        fatherName:      document.querySelector("[name='fatherName']").value,
        motherName:      document.querySelector("[name='motherName']").value,
        gender:          document.querySelector("[name='gender']").value,
        dob:             document.querySelector("[name='dob']").value,
        age:             document.getElementById("age").value,
        mobile:          document.querySelector("[name='mobile']").value,
        email:           document.querySelector("[name='email']").value,
        aadhar:          document.querySelector("[name='aadhar']").value,
        category:        document.querySelector("[name='category']").value,
        phouse:          document.getElementById("phouse").value,
        parea:           document.getElementById("parea").value,
        pdistrict:       document.getElementById("pdistrict").value,
        pcity:           document.getElementById("pcity").value,
        pstate:          document.getElementById("pstate").value,
        ppin:            document.getElementById("ppin").value,
        chouse:          document.getElementById("chouse").value,
        carea:           document.getElementById("carea").value,
        cdistrict:       document.getElementById("cdistrict").value,
        ccity:           document.getElementById("ccity").value,
        cstate:          document.getElementById("cstate").value,
        cpin:            document.getElementById("cpin").value,
        exam10:          document.querySelector("[name='exam10']").value,
        board10:         document.querySelector("[name='board10']").value,
        school10:        document.querySelector("[name='school10']").value,
        year10:          document.querySelector("[name='year10']").value,
        maxMarks10:      document.getElementById("maxMarks10").value,
        obtMarks10:      document.getElementById("obtMarks10").value,
        percent10:       document.getElementById("per10").value,
        exam12:          document.querySelector("[name='exam12']").value,
        board12:         document.querySelector("[name='board12']").value,
        college12:       document.querySelector("[name='college12']").value,
        year12:          document.querySelector("[name='year12']").value,
        physics:         document.getElementById("physics").value,
        chemistry:       document.getElementById("chemistry").value,
        biology:         document.getElementById("biology").value,
        english:         document.getElementById("english").value,
        pcbPercent:      document.getElementById("percentage").value,
        subject12:       document.querySelector("[name='subject12']").value
    };
}
