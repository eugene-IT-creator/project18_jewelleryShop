$(document).ready(() => {
    const swiper = new Swiper(".mySwiper", {
        rewind: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        style: {
        }
    });

    // ANIMATE
    new WOW().init();

    //    CHOOSE ITEM OPTION

    let itemCategory = $('.choose-items-item');

    itemCategory.removeAttr('href');

    itemCategory.click(function () {
        const item = $(this);
        itemCategory.css('font-family', 'Play-Regular', 'sans-serif').css('border-bottom', 'transparent');
        item.css('font-family', 'Play-Bold', 'sans-serif').css('border-bottom', 'solid');
    })


//    POPUP 1: SKETCH CALCULATION

    let popupCalculate = $('.popup-calculate');
    let mainWindow = $('.general');


    let popupSuccess = $('.popup-sent');
    let submittedBtn = $('#submitted');

    $('.popup-calc-btn').click(function () {

        popupCalculate.css('display', 'block');
        mainWindow.css('filter', 'Blur(6px)');

        $('#closePopup').click(function () {
            popupCalculate.css('display', 'none');
            mainWindow.css('filter', 'none');
        })
    })

    // POPUP 1: FORM SUBMISSION

    $('#submit').click(function () {

        let name = $('#name');
        let email = $('#email');
        let phone = $('#phone').inputmask({"mask": "+(99) 999-999-99-99"});
        let itemName = $('#itemName');
        let alloy = $('#alloy');
        let gems = $('#gems');

        let check = $('#checked');

        let hasError = false;

        let inputs = $('.popup-calc-input').css('border-color', 'black');

        $('.popup-calc-error-input').hide();

        inputs.each(function () {
            const input = $(this);
            if (!input.val()) {
                input.next().show();
                input.css('border-color', 'red');
                hasError = true;
            }
        })

        $(".popup-calc-form").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    email: "Please enter a valid email address.",
                }
            },

        });

        if (!check.is(':checked')) {
            check.next().next().show();
            hasError = true;
        }

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: 'https://testologia.ru/checkout',
                data: {
                    name: name.val(),
                    email: email.val(),
                    phone: phone.val(),
                    itemName: itemName.val(),
                    alloy: alloy.val(),
                    gems: gems.val(),
                },
            })
                .done(function (message) {
                    if (!message.success) {
                        popupCalculate.hide();
                        popupSuccess.show();

                        submittedBtn.click(function () {
                            popupSuccess.hide();
                            mainWindow.css('filter', 'none');
                        })
                    } else {
                        alert('Error occurred! Please call us or try again later.')
                    }
                })
        }
    })

    //    POPUP 2: CHECK PRICE

    let checkPriceBtn = $('.check-price-btn');
    let popupCheckPrice = $('.popup-checkPrice');

    checkPriceBtn.click(function () {

        popupCheckPrice.show();
        mainWindow.css('filter', 'Blur(6px)');

        $('#closePopup-checkPrice').click(function () {
            popupCheckPrice.css('display', 'none');
            mainWindow.css('filter', 'none');
        })
    })

    // POPUP 2: FORM SUBMISSION

    $('#submit-checkPrice').click(function () {
        let nameCheckPrice = $('#name-checkPrice');
        let emailCheckPrice = $('#email-checkPrice');
        let phoneCheckPrice = $('#phone-checkPrice').inputmask({"mask": "+(99) 999-999-99-99"});

        let checkCheckPrice = $('#checked-checkPrice');

        let hasError = false;

        let inputsCheckPrice = $('.input-checkPrice').css('border-color', 'black');

        $('.error-input-checkPrice').hide();

        inputsCheckPrice.each(function () {
            const input = $(this);
            if (!input.val()) {
                input.next().show();
                input.css('border-color', 'red');
                hasError = true;
            }
        })

        $(".form-checkPrice").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    email: "Please enter a valid email address.",
                }
            },

        });

        if (!checkCheckPrice.is(':checked')) {
            checkCheckPrice.next().next().show();
            hasError = true;
        }

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: 'https://testologia.ru/checkout',
                data: {
                    name: nameCheckPrice.val(),
                    email: emailCheckPrice.val(),
                    phone: phoneCheckPrice.val()
                },
            })
                .done(function (message) {
                    if (message.success) {
                        popupCheckPrice.hide();
                        popupSuccess.show();

                        submittedBtn.click(function () {
                            popupSuccess.hide();
                            mainWindow.css('filter', 'none');
                        })
                    } else {
                        alert('Error occurred! Please call us or try again later.');
                    }
                })
        }
    })

//    NEWSLETTER SUBSCRIBE BUTTON
    let footerSubscribe = $('.footer-subscribe');
    let subscribeSuccessful = $('.footer-subscribe-success');

    $('#subscribeBtn').click(function () {
        let subscribeMail = $('.footer-subscribe-mail').css('border-color', 'none');

        let hasError = false;

        if (!subscribeMail.val()) {
            subscribeMail.css('border-color', 'red');
            hasError = true;
        } else {
            footerSubscribe.hide();
            subscribeSuccessful.show();
        }
    })
})
