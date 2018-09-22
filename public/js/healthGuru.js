let weight;
let height;
let age;
let pal;
let BMI;
let BMIresult;
let poundsToGoal;
let TEE;
let quantity;
let dietPlan;
let x = 0;


$("#logo").on('click', function () {
    location.reload();
})


$("#attach").on('click', "#createCustom", function(){
    $("#attach").children().remove();
    let queryString = `/api/foods`

    $.get(queryString, function (data) {
        
        console.log("this new api work: ", data);
        console.log("testing data length:  " + data.length + "\n");

        console.log(data[0]);

        let newDiet = `
        <div id="activeLevel" class="dropdown text-center">
            <h3 "text-center">Add a food to your diet plan</h3>
            <div class="input-group mb-3">

                <select id="newItem" class="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                    <option selected>Choose...</option>
                </select>
            </div>
        
        </div>
        <hr id="split" class="my-4">
        <a id="update" class="btn btn-primary btn-lg" href="#" role="button">Update Plan</a>`

        $("#attach").append(newDiet);
        data.forEach(foodItem => {
            let option = `<option class="option" value="${foodItem.id}">(${foodItem.name})   Serving Size: (${foodItem.serving_size})   kcal: (${foodItem.kcal})   Vegan: (${foodItem.isVeg})   Gluten-Free: (${foodItem.isFree})</option>`
            $("#attach #newItem").append(option);
        });
        let table = `<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Food Item</th>
        <th scope="col">Serving Size</th>
        
        <th scope="col">Kcal</th>
      </tr>
    </thead>
    <tbody id="tableBody">
      
    </tbody>
  </table>
  <button id="customPlan" type="button" class="btn btn-primary btn-lg btn-block results">Save Your Plan!!</button>`
  
  $("#attach").append(table);

    }) 

    
})

$("#attach").on("click", "#update", function(){
  

  let id = $("#newItem").val()
  console.log("this is my id: ", id);
  let queryString = `/api/foods/`

  $.get(queryString + id, function (data) {
            console.log("this is my data: ", data)
            
            let tableInsert =   `<tr>
            <th scope="row">${x += 1}</th>
            <td id="name">${data[0].name}</td>
            <td id="serving">${data[0].serving_size}</td>
            <td id="kcal">${data[0].kcal}</td>
        
        </tr>`
        
        $("#attach #tableBody").append(tableInsert);
       
        // $.ajax("/api/burgers/" + id, {
        //     type: "PUT",
         
        //   }).then(
        //     function() {
              
             
        //     }
        //   );
  })

  
 
})

$("#learnMore").on("click", function () {

    weight = parseInt($("#weight").val().trim());
    height = parseInt($("#feet").val().trim()) * 12 + parseInt($("#inches").val().trim());
    age = parseInt($("#age").val().trim());
    pal = parseFloat($("#pal").val().trim());

    calcWeight();
    // $.get("/api/food_plans?TEE=" + TEE, function (data) {
    //     console.log("my api worked", data);
    // })

    $("#home").detach();
    $(".icon").detach();
    $("#activeLevel").detach();
    $("learnMore").detach();
    $(".my-4").detach();
    results();


})

const results = function () {
    const resultMes = !BMIresult ? 'You are just right!' : BMIresult === 1 ? 'You are overweight' : 'You are underweight'
    const goalMessage = BMIresult ?
        `<div id="goal" class="row results">
                                    
        <p>You need to ${BMIresult === -1 ? 'gain' : 'lose'}: ${poundsToGoal} pounds to reach a healthy weight</p> 

        </div>` : "";
    let resultsDiv =
        `
                    <h2 class="results">Your Results</h2>
                        <div class="row results">
                            <div class="col-sm-6">
                                <ul>
                                    <li> your BMI is ${BMI.toFixed(2)} </li> 
                                </ul>
                            </div> 
                            <div class="col-sm-6">
                                <ul>
                                    <li>${resultMes} </li> 
                                </ul>
                            </div> 
                            
                        </div>
                        ${goalMessage}
                        <div class="row results">
                                
                            <p>Your daily caloric burn rate is: ${TEE}</p> 
                    
                        </div>
                        <a id="createCustom" class="btn btn-primary btn-lg" href="#" role="button">Create Custom</a>
                        <h1 class="text-center results"><strong>Select your diet plan options </strong></h1>
                        <div class="text-center results">
                            <button type="button" id="vegan" data-clicked=0 class="btn btn-light btn-lg planIcons text-center"><img src="https://cdn1.iconfinder.com/data/icons/flat-green-organic-natural-badges/500/Vegan-2-512.png"></button>
                            <button type="button" id="gluten" data-clicked=0 class="btn btn-light btn-lg planIcons text-center"><img src="https://www.mindfullysplendid.com/wp-content/uploads/2016/09/gluten-free-icon.png"></button>
                        </div>
                        <button id="customPlan" type="button" class="btn btn-primary btn-lg btn-block results">Search Plans Custom For You!!</button>

                        `
    $("#attach").append(resultsDiv);

}

$("#attach").on("click", "#customPlan", function () {


    let isVeg = $("#vegan").data("clicked");
    let isFree = $("#gluten").data("clicked");
    console.log("This is what I am trying to isVeg: ", isVeg);
    console.log("This is what I am trying to isFree: ", isFree);

    let queryString = `/api/Plans?TEE=${TEE}&isVeg=${isVeg}&isFree=${isFree}&BMI=${BMI}`

    $.get(queryString, function (data) {
        $(".results").detach();
        console.log("my api worked", data);
        data.forEach(element => {
            let selecetPlan =
                `<button type="button" value="${element.id}" data-cal="${element.maxKcal}" class="btn btn-primary btn-lg picked"> ${element.name} calories: ${element.maxKcal}</button>`

            $("#attach").append(selecetPlan);
        });


    })
})

$("#attach").on('click', '.picked', function () {
    $(".table").remove();
    $(".phrase").remove();

    let table = `<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Food Item</th>
        <th scope="col">Serving Size</th>
        <th scope="col">Quantity</th>
        <th scope="col">Kcal</th>
      </tr>
    </thead>
    <tbody id="tableBody">
      
    </tbody>
  </table>`

    $("#attach").append(table)


    console.log($(this).val());
    let id = $(this).val();
    dietPlan = $(this).data('cal');

    let daysToGoal = ((poundsToGoal * 3500) / (Math.abs(dietPlan - TEE)));
    console.log("Days to reach target weight with this diet Plan: ", daysToGoal);

    if (BMIresult) {
        let goalPhrase = `<p class="phrase">Days to reach target weight with this diet Plan: ${parseInt(daysToGoal)}</p>`
        $("#attach").prepend(goalPhrase);
    }

    console.log("this is the diet plan calories: ", dietPlan)
    let queryString = `/api/food_plans?id=${id}`

    $.get(queryString, function (data) {

        console.log("this new api work: ", data);
        console.log("testing data length:  " + data.length + "\n");

        console.log(data[0]);

        var Plan = data[0];

        console.log("testing Plan.name:  " + Plan.name);
        console.log("testing Plan.maxKcal:  " + Plan.maxKcal);
        console.log("testing Plan.isFree:  " + Plan.isFree);
        console.log("testing Plan.isVeg:  " + Plan.isVeg);

        console.log("\n==================================");
        console.log("Testing food array");

        for (var x = 0; x < Plan.Foods.length; x++) {
            console.log(Plan.Foods[x]);
            console.log("testing Plan.Foods[" + x + "].name value:  " + Plan.Foods[x].name);
            console.log("testing Plan.Foods[" + x + "].serving_size value:  " + Plan.Foods[x].serving_size);
            console.log("testing Plan.Foods[" + x + "].kcal value:  " + Plan.Foods[x].kcal);

            let tableInsert = `
                        <tr>
                            <th scope="row">${x + 1}</th>
                            <td>${Plan.Foods[x].name}</td>
                            <td id="qty">${Plan.Foods[x].serving_size}</td>
                            <td>${Plan.Foods[x].Food_plans.qty}</td>
                            <td>${Plan.Foods[x].kcal}</td>
                        </tr>
                        //         `


            $("#attach #tableBody").append(tableInsert);

        }
        console.log("\n==================================\n");


        // data.forEach((plan, i) => {            
        //     $.get(`/ api / Foods ? id = ${ plan.FoodId }`, function (data){
        //         console.log(data);
        //         console.log("this is my bullshit: ", data[0].name);

        //         let tableInsert = `
        //             <tr>
        //                 <th scope="row">${i + 1}</th>
        //                 <td>${data[0].name}</td>
        //                 <td id="qty">${data[0].serving_size}</td>
        //                 <td>${plan.qty}</td>
        //                 <td>${data[0].kcal}</td>
        //             </tr>
        //         `


        //       $("#attach #tableBody").append(tableInsert);

        //     })

        // })


    })
})

$("#attach").on("click", "#vegan", function () {
    console.log($("#vegan").data("clicked"));
    if ($("#vegan").data("clicked") === 0) {
        $("#vegan").css("border", "4px solid green").data("clicked", 1);
    } else {
        $("#vegan").css("border", "unset").data("clicked", 0);
    }
})

$("#attach").on("click", "#gluten", function () {
    console.log($("#gluten").data("clicked"));
    if ($("#gluten").data("clicked") === 0) {
        $("#gluten").css("border", "4px solid brown").data("clicked", 1);
    } else {
        $("#gluten").css("border", "unset").data("clicked", 0);
    }
})

$("#male").on('click', function () {
    console.log($("#male").data("click"));
    if (!$("#male").data("click")) {
        $("#male").css("color", "red").data("click", 1)
        $("#female").css("color", "black");

    }
})

$("#female").on("click", function () {
    console.log($("#male").data("click"));
    if ($("#male").data("click")) {
        $("#male").css("color", "black").data("click", 0)
        $("#female").css("color", "red");

    }
})

const calcWeight = function () {

    const isMale = $("#male").data("click");

    BMR = isMale ? 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age) : 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
    TEE = pal * BMR;

    console.log("your resting calorie burn is: ", BMR);
    TEE = parseInt(pal * BMR);
    console.log("your daily caloric burn with your activity level is: ", TEE);
    BMI = (weight * 703) / Math.pow(height, 2);
    console.log("your BMI is : ", BMI);



    // if (BMI < 18.5) {
    //     BMIresult = "you are underweight";
    //     let varBMI = 18.5;
    //     totalPounds = (BMI * Math.pow(height, 2)) / 703;
    //     idealPounds = (varBMI * Math.pow(height, 2)) / 703;
    //     poundsToGoal = Math.round(idealPounds - totalPounds);
    //     phraseThatPays = "gain";

    // }

    if (BMI >= 18.5 & BMI <= 24.9) {
        BMIresult = 0;

    } else {
        BMIresult = BMI < 18.5 ? -1 : 1
        let varBMI = BMI < 18.5 ? 18.5 : 24.9
        const totalPounds = (BMI * Math.pow(height, 2)) / 703;
        const idealPounds = (varBMI * Math.pow(height, 2)) / 703;
        poundsToGoal = Math.abs(Math.round(totalPounds - idealPounds))
    }

    // if (BMI > 24.9) {
    //     let varBMI = 24.9;
    //     BMIresult = "you are overweight";
    //     totalPounds = (BMI * Math.pow(height, 2)) / 703;
    //     idealPounds = (varBMI * Math.pow(height, 2)) / 703;
    //     poundsToGoal = Math.round(totalPounds - idealPounds);
    //     console.log("pounds to lose", poundsToGoal);
    //     phraseThatPays = "lose";

    // }
}

// Use this route $.get("/api/food_plans/" + ID, function (data) {
// Query this after the user has selected a diet plan from Plans table first
// then use the Plans ID here to query this route
// It will return data from Plans table and all related FOOD data from the Foods table
// that is tied to that particular plan
$("#buttonID4").click(function () {
    console.log("find food plans #1 with food data button clicked!");

    var ID = 1;

    console.log("testing ID: " + ID);

    $.get("/api/food_plans/" + ID, function (data) {
        console.log("Posts: ", data);

        console.log("testing data length:  " + data.length + "\n");

        console.log(data[0]);

        var Data = data[0];

        console.log("testing Data.name:  " + Data.name);
        console.log("testing Data.maxKcal:  " + Data.maxKcal);
        console.log("testing Data.isFree:  " + Data.isFree);
        console.log("testing Data.isVeg:  " + Data.isVeg);

        console.log("\n==================================");
        console.log("Testing food array");

        for (var x = 0; x < Data.Foods.length; x++) {
            console.log(Data.Foods[x]);
            console.log("testing Data.Foods[" + x + "].name value:  " + Data.Foods[x].name);
            console.log("testing Data.Foods[" + x + "].serving_size value:  " + Data.Foods[x].serving_size);
            console.log("testing Data.Foods[" + x + "].kcal value:  " + Data.Foods[x].kcal);
        }
        console.log("\n==================================\n");


    })


});

// Note for other group members:
// I put these into random buttons I made in an index.html
// if you want to use handlebars, you will need to delete that index.html file that I randomly made to test these buttons
// $("#buttonID1").click(function () {
//     console.log("get specific food plan button clicked");

//     $.get("/api/food_plans", function (data) {
//         console.log("Posts: ", data);

//         console.log("testing data length:  " + data.length + "\n");

//         for (var x = 0; x < data.length; x++) {
//             console.log(data[x]);
//         }
//     });

// });

// $("#buttonID2").click(function () {
//     console.log("Non-specific diet plan 3500 calorie button clicked");

//     $.get("/api/non_specific_3500cal", function (data) {
//         console.log("Posts: ", data);

//         // to save each food entry
//         var foodArray = [];

//         var calorieLimit = 3500;
//         var calorieCounter = 0;

//         console.log("calorieLimite:  " + calorieLimit);
//         console.log("calorieCounter: " + calorieCounter);

//         console.log("testing data length:  " + data.length + "\n");

//         for (var x = 0; x < data.length; x++) {
//             console.log(data[x]);
//             console.log("testing data[" + x + "].name value:  " + data[x].name);
//             console.log("testing data[" + x + "].kcal value:  " + data[x].kcal);

//             if (calorieCounter + data[x].kcal <= calorieLimit) {
//                 calorieCounter += data[x].kcal;
//                 console.log("calorieCounter:  " + calorieCounter);
//                 foodArray.push(data[x]);
//             }

//         }

//         console.log("testing foodArray now");
//         console.log(foodArray);
//         console.log("testing final calorieCounter:   " + calorieCounter);
//     });


// });


// $("#buttonID3").click(function () {
//     console.log("Vegan diet plan 2000 calorie button clicked");

//     $.get("/api/vegan_2000cal", function (data) {
//         console.log("Posts: ", data);

//         // to save each food entry
//         var foodArray = [];

//         var calorieLimit = 2000;
//         var calorieCounter = 0;

//         console.log("calorieLimite:  " + calorieLimit);
//         console.log("calorieCounter: " + calorieCounter);

//         console.log("testing data length:  " + data.length + "\n");

//         for (var x = 0; x < data.length; x++) {
//             console.log(data[x]);
//             console.log("testing data[" + x + "].name value:  " + data[x].name);
//             console.log("testing data[" + x + "].kcal value:  " + data[x].kcal);

//             if (calorieCounter + data[x].kcal <= calorieLimit) {
//                 calorieCounter += data[x].kcal;
//                 console.log("calorieCounter:  " + calorieCounter);
//                 foodArray.push(data[x]);
//             }

//         }

//         console.log("testing foodArray now");
//         console.log(foodArray);
//         console.log("testing final calorieCounter:   " + calorieCounter);
//     });


// });



// let dietPlan1 = 3500;
// let dietPlan2 = 3000;
// let dietPlan3 = 2500;
// let dietPlan4 = 2000;






// BMI = (lbs * 703) / Math.pow(inches,2);
// console.log("your BMI is : ", BMI);

// if (BMI < 18.5) {
//     console.log("you are underweight")
// } 

// if (BMI >= 18.5 & BMI <= 24.9) {
//     console.log("you are just right")
// }

// if (BMI > 24.9){
//     console.log("you are overweight")
//     varBMI = 24.9;



//    

//     if(TEE < dietPlan1 & TEE > dietPlan2) {
//         daysToGoal = ((poundsToGoal * 3500) / (TEE - dietPlan2));
//         console.log("days to goal with diet plan2: ", daysToGoal);
//     }

//     

//     if (TEE < dietPlan3 & TEE > dietPlan4){
//         daysToGoal = ((poundsToGoal * 3500) / (TEE - dietPlan4));
//         console.log("days to goal with diet plan4: ", daysToGoal);
//     }

// }

// console.log("log back in next week and enter your new weight to see if you are on track to meet your goal")
