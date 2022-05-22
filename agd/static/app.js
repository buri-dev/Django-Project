function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('datetime').innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function startDate() {
  const today = new Date();
  let sar = today.getMonth() + 1;
  let udur = today.getDate();
  let on = today.getFullYear();
  document.getElementById('day-month-year').innerHTML = sar + " сарын " + udur + " " + on + " он";
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }; // add zero in front of numbers < 10
  return i;
}


const buttonsArray = document.querySelectorAll(".btn");
const wrapper = document.querySelector(".slider-wrapper");

buttonsArray.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-500 * index}px)`;
  })
})
const drinkButton = document.querySelector(".drink-button");
const saladButton = document.querySelector(".salad-button");
const drinkPictures = document.querySelector(".drink-pictures");
const saladPictures = document.querySelector(".salad-pictures");

drinkButton.addEventListener("click", () => {
  drinkPictures.style.visibility = "visible";
})
saladButton.addEventListener("click", () => {
  saladPictures.style.visibility = "visible";
})

// document ready function

let foodOrders = [];

$('.picture-and-text').on('click', function () {
  const data = {
    id: $(this).attr('id'),
    name: $(this).find('.food-name').text(),
    price: $(this).find('.food-price').text(),
  };

  if (foodOrders.some(food => food.id === data.id)) {
    foodOrders = foodOrders.map(food => {
      if (food.id === data.id) {
        food.quantity += 1;
      }
      return food;
    });
  } else {
    foodOrders.push({
      ...data,
      quantity: 1,
    });
  }
  updateOrder();
});
//
// $(document).ready(
//     function(){
//         const data = JSON.parse(localStorage.getItem('data'));
//         foodOrders = data;
//         data.forEach(food => {
//             $('.calculator-table').append(`
//                 <tr>
//                   <td>${food.name}</td>
//                   <td>${food.quantity}ш</td>
//                   <td>${food.price}</td>
//                   <td>${food.quantity * Number.parseInt(food.price)}₮</td>
//                 </tr>
//             `);
//         });
//         $('.sum-board-price').text(data.reduce((sum, food) => sum + food.quantity * Number.parseInt(food.price), 0) + '₮');
//     }
// )


function updateOrder(){
 $('.calculator-table').find("tr:gt(0)").remove();
  foodOrders.forEach(food => {
    $('.calculator-table').append(`
      <tr>
        <td>${food.name}</td>
        <td>${food.quantity}ш</td>
        <td>${food.price}</td>
        <td>${food.quantity * Number.parseInt(food.price)}₮</td>
      </tr>
    `);
  });
  $('.sum-board-price').text(foodOrders.reduce((sum, food) => sum + food.quantity * Number.parseInt(food.price), 0) + '₮');
}

$('.cancel-button').on('click', function () {
  foodOrders = [];
  // localStorage.setItem('data', JSON.stringify([]));
  updateOrder();
});

$.ajaxSetup({
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie !== '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                     if (cookie.substring(0, name.length + 1) === (name + '=')) {
                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                         break;
                     }
                 }
             }
             return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});

  const data = {
    foodOrders: foodOrders,
  };

$('.submit-button').on('click', function(){
  $.ajax({
    url: '/order/',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
        foodOrders = [];
        updateOrder();
        window.location.reload();
    },
    error: function (error) {
      alert(error);
    }
  });
})

$('.duty').on('click', function(event){
    $('.modal').css('display', 'block');
    let orderId = $(this).attr('id');
    $.ajax({
        url: '/order/' + orderId + '/',
        type: 'GET',
        success: function (data) {
            $('.ordered-foods').find("li").remove();
            data.foods.map(food => {
                $('.ordered-foods').append(`<li>${food}</li>`)
            })
            $('.order-id').text("Захиалга #" + data.id).attr('id', data.id);;
            $('.modal-price').text("Нийт: " + data.total + '₮');
        },
    })
})

 $(document).on('click', function(event) {
        if ($(event.target).is('.modal')) {
            $('.modal').css('display', 'none');
        }
    });

$('.close').on('click', function(){
  $('.modal').css('display', 'none');
})

$('.modal-button-save').on('click', function(){
    $('.modal').css('display', 'none');
  $('.notification-text').text('Амжилттай хадгаллаа');
  $('.notification-top').css('display', 'block')
  setTimeout(function(){
    $('.notification-top').css('display', 'none')
  }, 2000);
    let id = $('.order-id').attr('id')
    $.ajax({
        url: '/update/' + id + '/',
        type: 'PUT',
        success: function (data) {
            window.location.reload();
        },
    })
})

$('.done').on('click', function(event){
    event.stopPropagation();
    $(this).css('background-color') === 'rgba(0, 0, 0, 0)' ? $(this).css('background-color', 'green') : $(this).css('background-color', 'rgba(0, 0, 0, 0)');
})

$('.modal-button-delete').on('click', function(){
    // localStorage.setItem('data', JSON.stringify(foodOrders));
    $('.modal').css('display', 'none');
  $('.notification-text').text('Амжилттай устгалаа!!');
  $('.notification-top').css('display', 'block')
  setTimeout(function(){
    $('.notification-top').css('display', 'none')
  }, 2000);

  let id = $('.order-id').attr('id')
  $.ajax({
    url: '/delete/' + id + '/',
    type: 'DELETE',
    success: function (data) {
        window.location.reload();
    },
  })
})