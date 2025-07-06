document.addEventListener(("DOMContentLoaded"), ()=>{
    //! Select the elements
    const calculateBtn = document.getElementById("calculateBtn");
    const amountInput = document.getElementById("amount");
    const interestInput = document.getElementById("interest");
    const yearsInput = document.getElementById("years");


    // summary
    const monthlyPayment = document.getElementById("monthly");
    const totalPayment = document.getElementById("total");
    const totalInterestPayment = document.getElementById("totalInterest");

    // Function to calculate the loan
    function calculateLoan(){
        const principal = parseFloat(amountInput.value);
        const interest = parseFloat(interestInput.value)/100/12;
        const payment = parseFloat(yearsInput.value)  * 12;

        if(isNaN(principal) || isNaN(interest) || isNaN(payment)){
            alert('Please enter valid numbers');
            return;
        }

        // Monthly Payment
        const x = Math.pow(1+interest,payment);
        const monthly = (principal * x * interest)/(x-1);
        if(isFinite(monthly)){
            // Calculate total Payment and interest
            const total = monthly*payment;
            const totalInterest = total - principal;
            // Display the results

           /* monthlyPayment.innerHTML = monthly;
            totalPayment.innerHTML = total;
            totalInterestPayment.textContent = totalInterest;
           */

            animateValue(monthlyPayment,0,monthly,1000);
            animateValue(totalPayment,0,total,1000);
            animateValue(totalInterestPayment,0,totalInterest,1000);
        }

    }  
    
    // Function for animation
    function animateValue(element,start,end,duration){
        const startTime = performance.now();

        function update(currentTime){
            const elapsed = currentTime-startTime;
            const progress = Math.min(elapsed/duration, 1);
            const current = start + (end-start) * progress;
            element.textContent = `$${current.toFixed(2)}`;

            if(progress < 1){
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Bind the event to calculate button
    calculateBtn.addEventListener(('click'),calculateLoan);

});


