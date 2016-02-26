var curPosition = 50;
var curSlide = 2;
var hoverHeader = false;
var topShow = 800;
var winHeight = $(window).height();
var winScroll = $(this).scrollTop();
var counting = {
	projectsCount : 0,
	projectsMax : 22,
	clientsCount : 0,
	clientsMax : 54,
	certificatesCount : 0,
	certificatesMax : 101
}

function changeTitle(){
	switch(curPosition){
		case 0:   curSlide = 1; break;
		case 50:  curSlide = 2; break;
		case 100: curSlide = 3; break;
	}
	$(".text-1").css({"opacity":"0","z-index":"1"});
	$(".text-2").css({"opacity":"0","z-index":"1"});
	$(".text-3").css({"opacity":"0","z-index":"1"});
	$(".text-"+curSlide).css({"opacity":"1","z-index":"5"});
}

function changeNumber(className, count, max, interval){
	setInterval(function(){
		if(counting[count] == counting[max]){
			return;
		}
		$(className).text(++counting[count]);
	},interval);	
}

$(document).ready(function(){
	$("header").css({"height" : winHeight});
	$(".left-arrow").on("click",function(){
		if(curPosition == 0){
			curPosition = 100;
		}
		else{
			curPosition -= 50;
		}
		$("header").css({"backgroundPosition":curPosition+"%"});
		changeTitle();
	});
	$(".right-arrow").on("click",function(){
		if(curPosition == 100){
			curPosition = 0;
		}
		else{
			curPosition += 50;
		}
		$("header").css({"backgroundPosition":curPosition+"%"});
		changeTitle();
	});

	$("#up").on("click", function(e){
		$("html, body").animate({scrollTop: 0}, 1000);
		e.preventDefault();
	});

	$(window).on("scroll", function(){
		winScroll = $(this).scrollTop();
		if($(this).scrollTop() > topShow){
			$("#up").css({"transform": "translateX(0)"});
		}
		else{
			$("#up").css({"transform": "translateX(100px)"});
		}
		
		if(winScroll >= $(".counting").offset().top - winHeight + winHeight/2){
			changeNumber(".projects-count", "projectsCount", "projectsMax", 30);
			changeNumber(".clients-count", "clientsCount", "clientsMax", 30);
			changeNumber(".certificates-count", "certificatesCount", "certificatesMax", 30);
			$("footer").css({"display" : "block"}); // fix show footer when load page
		}
	});
});