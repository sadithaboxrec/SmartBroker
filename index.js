function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Set to 'flex' to enable the CSS centering properties (align-items/justify-content)
        modal.style.display = 'flex'; 
    } else {
        console.error(`Modal with ID '${modalId}' not found.`);
    }
}


function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}


function closeOnOutsideClick(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}

// --- Custom msg controlling ---

const msgBox = document.getElementById('messageBox');
const msgTitle = document.getElementById('msgTitle');
const msgText = document.getElementById('msgText');


function showMessage(title, message, isError = false) {
    // Check if message box elements exist before trying to use them
    if (!msgBox || !msgTitle || !msgText) {
        console.error('Message box elements not found. Cannot show message.');
        // Fallback to alert for debugging if the message box is missing
        alert(`${title}: ${message}`);
        return;
    }
    
    msgTitle.textContent = title;
    msgText.textContent = message;
    msgBox.className = isError ? 'msg-box error' : 'msg-box success';
    
    // Update icon based on status (assuming you are using Font Awesome)
    const icon = msgBox.querySelector('.msg-icon i');
    if (icon) {
        icon.className = isError ? 'fa-solid fa-times-circle' : 'fa-solid fa-check-circle';
    }
    
    msgBox.style.display = 'block';
}

/* Closes the custom message box. */
function closeMessageBox() {
    if (msgBox) {
        msgBox.style.display = 'none';
    }
}

       // --- Phone formatting
document.addEventListener('DOMContentLoaded', (event) => {
    
    const prefix = "+ "; 

    function applyPhoneFormat(inputElement) {

        inputElement.value = ""; 
        inputElement.value = prefix;


        inputElement.addEventListener('focus', function(e) {
            
            if (!e.target.value.startsWith(prefix) || e.target.value.length < prefix.length) {
                e.target.value = prefix;
            }
            e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        });

        inputElement.addEventListener('input', function(e) {
            let currentValue = e.target.value;

            if (currentValue === "" || currentValue === "+") {
                e.target.value = "";
                return;
            }

           
            if (!currentValue.startsWith(prefix) || currentValue.length < prefix.length) {
                e.target.value = prefix;
                e.target.setSelectionRange(prefix.length, prefix.length);
                return;
            }

            let digits = currentValue.substring(prefix.length).replace(/\D/g, '');
            digits = digits.substring(0, 11); // Limit to 11 digits after +94

            
            let formattedDigits = '';
            
            if (digits.length > 0) {
                formattedDigits += digits.substring(0, 2); 
            }
            if (digits.length > 2) {
                formattedDigits += ' ' + digits.substring(2, 4);
            }
            if (digits.length > 4) {
                formattedDigits += ' ' + digits.substring(4, 7);
            }
            if (digits.length > 7) {
                formattedDigits += ' ' + digits.substring(7, 11);
            }

            e.target.value = prefix + formattedDigits;
            e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        });
    }

    const brokerInput = document.getElementById('broker-whatsapp');
    const reqInput = document.getElementById('req-whatsapp');

    if (brokerInput) applyPhoneFormat(brokerInput);
    if (reqInput) applyPhoneFormat(reqInput);
});

// --- Form submission validation---
 
function validateBrokerForm(form) {
    const name = form.elements['name'].value.trim();
    const idNumber = form.elements['id_number'].value.trim();
    const email = form.elements['email'].value.trim(); // NEW
    const contactNo = form.elements['contact_no'].value.trim();
    const district = form.elements['district'].value;
    const address = form.elements['address'].value.trim(); // NEW
    const specialty = form.elements['specialty'].value.trim();

    // Regular Expression for NIC: 9 digits followed by V or X, OR 12 digits (new format)
    const nicRegex = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/;
    // Permissive regex for phone number that handles the spacing: +94 XX XXX XXXX
    // const phoneRegex = /^\+94\s\d{2}\s\d{3}\s\d{4}$/; 
    // const phoneRegex = /^\+\s94\d{2}\s\d{3}\s\d{4}$/;

    // Basic email regex (built-in HTML validation is usually better, but this acts as a final check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 


    if (name.length < 3) {
        showMessage('Validation Error', 'Please enter your full name.', true);
        return false;
    }

    if (!nicRegex.test(idNumber)) {
        showMessage('Validation Error', 'Please enter a valid National ID Number (9 digits + V/X or 12 digits).', true);
        return false;
    }

    if (!emailRegex.test(email)) {
        showMessage('Validation Error', 'Please enter a valid email address.', true);
        return false;
    }


    // const cleanContactNo = contactNo.replace(/\s/g, ''); // remove spaces for length check
    // if (cleanContactNo.length !== 11 || !contactNo.startsWith('+ ')) { 
    //     showMessage('Validation Error', 'Please enter a complete WhatsApp number, starting with +94 and 11 digits (e.g., +94 7X XXX XXXX).', true);
    //     return false;
    // }

//     if (!phoneRegex.test(contactNo)) {
//     showMessage('Validation Error', 'Please enter a valid WhatsApp number in the format: +94 XX XXX XXXX.', true);
//     return false;
// }

const phoneRegex = /^\+\s94\s\d{2}\s\d{3}\s\d{4}$/;

if (!phoneRegex.test(contactNo)) {
    showMessage('Validation Error', 'Please enter a valid WhatsApp number in the format: + 94 XX XXX XXXX.', true);
    return false;
}

    if (district === "") {
        showMessage('Validation Error', 'Please select your District from the dropdown menu.', true);
        return false;
    }
    

    if (address.length < 10) {
        showMessage('Validation Error', 'Please enter your complete physical address.', true);
        return false;
    }

    if (specialty.length < 5) {
        showMessage('Validation Error', 'Please specify your area of specialty (e.g., Land Sales) clearly.', true);
        return false;
    }

    //  Only runs if all validations pass
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Broker Form Data submitted (Simulated):', data);

    showMessage(
        'Registration Successful!', 
        'Thank you for joining! We will review your bio data and contact you soon via your WhatsApp number.'
    );
    
    closeModal('brokerFormModal');
    form.reset();
    
    return false; // Prevent default HTML form submission
}

//  Requirement post form validation handling

function validateRequirementForm(form) {
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim(); // NEW
    const whatsapp = form.elements['whatsapp'].value.trim();
    const details = form.elements['details'].value.trim();

    // const phoneRegex = /^\+94\s\d{2}\s\d{3}\s\d{4}$/; 
    const phoneRegex = /^\+\s94\s\d{2}\s\d{3}\s\d{4}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 


    if (name.length < 3) {
        showMessage('Validation Error', 'Please enter your full name.', true);
        return false;
    }

    if (!emailRegex.test(email)) {
        showMessage('Validation Error', 'Please enter a valid email address.', true);
        return false;
    }

    // const cleanWhatsapp = whatsapp.replace(/\s/g, '');
    // if (cleanWhatsapp.length !== 12 || !whatsapp.startsWith('+94 ')) { 
    //     showMessage('Validation Error', 'Please enter a complete WhatsApp number, starting with +94 and 9 digits (e.g., +94 7X XXX XXXX).', true);
    //     return false;
    // }
    
    if (!phoneRegex.test(whatsapp)) {
    showMessage('Validation Error', 'Please enter a valid WhatsApp number in the format: + 94 XX XXX XXXX.', true);
    return false;
}


    if (details.length < 15) {
        showMessage('Validation Error', 'Please provide more details about your requirement (minimum 15 characters).', true);
        return false;
    }



    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Requirement Form Data submitted (Simulated):', data);

    showMessage(
        'Requirement Posted!', 
        'Your property requirement has been successfully submitted. Brokers in the network will be in touch!'
    );
    
    // Cleanup
    closeModal('requirementFormModal');
    form.reset();
    
    return false; 
}