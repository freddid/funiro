$('.header-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
});

$('.info-slider').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    slidesToScroll: 1,
});

$('.tips-slider').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 300,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
});

let allData = [
    { id: 0, src: './images/image 1.jpg', title: 'Syltherine', price: '2.500.000' },
    { id: 1, src: './images/image 2.jpg', title: 'Leviosa', price: '2.500.000' },
    { id: 2, src: './images/image 3.jpg', title: 'Lolito', price: '14.000.000' },
    { id: 3, src: './images/image 4.jpg', title: 'Respira', price: '500.000' },
    { id: 4, src: './images/image 5.jpg', title: 'Grifo', price: '1.500.000' },
    { id: 5, src: './images/image 6.jpg', title: 'Muggo', price: '150.000' },
    { id: 6, src: './images/image 7.jpg', title: 'Pingky', price: '7.000.000' },
    { id: 7, src: './images/image 8.jpg', title: 'Potty', price: '500.000' },
];

let arrLike = [];
let arrProd = [];

$('.products-card-share.heart').on('click', function (e) {
    $(this).toggleClass('active')
    let numEl = $(this).closest('.products-card').attr('datanum')
    if (!arrLike.includes(numEl)) arrLike.push(numEl)
    $('.header-heart-count').text(arrLike.length)
})

$('.products-card-wrapper button').on('click', function (e) {
    $('.basket-modal-wraqpper').addClass('add')
    let numEl = $(this).closest('.products-card').attr('datanum')
    if (!arrProd.includes(numEl)) {
        arrProd.push(numEl)
        $(this).addClass('active')
        $(this).text('Added')

        $('.basket-modal-els').append(`
        <div class="basket-modal-el" id="${allData[numEl].id}">
            <div class="basket-modal-el-img">
               <img src="${allData[numEl].src}" alt="">
            </div>
            <div class="basket-modal-el-img">${allData[numEl].title}</div>
            <div class="basket-modal-el-price">${allData[numEl].price}</div>
            <div class="basket-modal-el-rmv rmv"><i class="fas fa-trash"></i></div>
        </div>
     `)
    }
    $('.header-basket-count').text(arrProd.length)
})

function sum() {
    let sum = 0;
    arrProd.forEach(function callback(el) {
        sum += +allData[el].price.split('.').join("");
    })
    $('.basket-modal-char.elssum span').text(sum)
    $('.basket-modal-char.elscount span').text(arrProd.length)
    $('.header-basket-count').text(arrProd.length)
    if (!arrProd.length) $('.basket-modal-wraqpper').removeClass('add')
}

$('.header-basket').on('click', function (e) {
    $('body').addClass('modal')
    sum()
})

$('.basket-modal').on('click', '.basket-modal-el-rmv.rmv', function (e) {
    let thsId = $(this).closest('.basket-modal-el').attr('id')
    arrProd = arrProd.filter(function (f) { return f !== thsId })
    $(`.basket-modal-el#${thsId}`).remove()
    sum();
    $(`.products-card[datanum='${thsId}']`).find('button').text('Add to cart')
    $(`.products-card[datanum='${thsId}']`).find('button').removeClass('active')
})

$('.basket-modal-button.rmv').on('click', function (e) {
    $('.basket-modal-els').html('');
    $('.products-card button.active').removeClass('active')
    arrProd = [];
    sum()
})

$('.basket-modal-button.order').on('click', function () {
    $('.basket-modal-wraqpper').addClass('order')
})

$('.basket-modal-close').on('click', function (e) {
    $('.basket-modal-wraqpper').removeClass('order')
    $('body').removeClass('modal')
    if ($('.basket-modal-wraqpper').hasClass('success')) {
        $('.basket-modal-wraqpper').removeClass('success')
        $('.products-card-wrapper button').removeClass('active')
        $('.products-card-wrapper button').text('Add to cart')

        arrProd = [];
        sum()
    }
})

let nameF = $('.validate-input input[name="name"]');
let email = $('.validate-input input[name="email"]');
let subject = $('.validate-input input[name="subject"]');
let message = $('.validate-input textarea[name="message"]');

$('.contact1-form-btn.sbmt').on('click', function (event) {
    event.preventDefault();
    var check = true;
    if ($(nameF).val().trim() == '') {
        showValidate(nameF);
        check = false;
    }
    if ($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        showValidate(email);
        check = false;
    }
    if ($(message).val().trim() == '') {
        showValidate(message);
        check = false;
    }
    if (check) {
        let selectedData = [];
        let serial = $('#form1').serialize()
        arrProd.forEach((el) => {
            selectedData.push(allData[el])
        })
        $('.basket-modal-wraqpper').addClass('success')
        console.log(selectedData, serial)
    }
    return check;
});

$('.validate-form .input1').each(function () {
    $(this).focus(function () {
        var thisAlert = $(this).parent();
        $(thisAlert).removeClass('alert-validate');
    });
});

function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {

}

$('.contact1-form-btn.end').on('click', function (event) {
    event.preventDefault();
    $('.basket-modal-wraqpper').removeClass('order')
})