var curPosition = 50;
var curSlide = 2;
var hoverHeader = false;
var topShow = 800;
var winHeight = $(window).height();
var winScroll = $(this).scrollTop();
var countReview = 2;
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

function drawCircle(id,x,y,r,start,end,flag,color){
	var canvas = document.getElementById(id);
	var obCanvas = canvas.getContext("2d");

	obCanvas.beginPath();
	obCanvas.moveTo(x,y);
	obCanvas.lineTo(x,y-r);
	obCanvas.arc(x,y,r,start,end,flag);
	obCanvas.fillStyle = color;
	obCanvas.fill();
}

$(document).ready(function(){
	$("header").css({"height" : winHeight});
		
	$(".review-2").css({"transform":"translateX(0)"});
	$("header .left-arrow").on("click",function(){
		if(curPosition == 0){
			curPosition = 100;
		}
		else{
			curPosition -= 50;
		}
		$("header").css({"backgroundPosition":curPosition+"%"});
		changeTitle();
	});
	$("header .right-arrow").on("click",function(){
		if(curPosition == 100){
			curPosition = 0;
		}
		else{
			curPosition += 50;
		}
		$("header").css({"backgroundPosition":curPosition+"%"});
		changeTitle();
	});

	$(".reviews .left-arrow").on("click",function(){
		$(".review-"+countReview).css({"transform":"translateX(500%)"});
		countReview--;
		if(countReview < 1){
			countReview = 3;
		}
		$(".review-"+countReview).css({"transform":"translateX(0)"});
	});
	$(".reviews .right-arrow").on("click",function(){
		$(".review-"+countReview).css({"transform":"translateX(-500%)"});
		countReview++;
		if(countReview > 3){
			countReview = 1;
		}
		$(".review-"+countReview).css({"transform":"translateX(0)"});
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
			$("#up").css({"transform": "translateX(150px)"});
		}
		
		if(winScroll >= $(".skills").offset().top - winHeight + winHeight/2){
			$(".skill").css({"opacity":"1"});
			heightSkills = $(".skills").height();
			$(".percent").css({"top":heightSkills/2-$(".percent").height()/2});
			$(".skill-text").css({"top":heightSkills/2-$(".percent").height()/2});
			
			drawCircle("design",55,heightSkills/2,50,Math.PI/2,Math.PI*1.5,true,"green");
			drawCircle("design",55,heightSkills/2,50,Math.PI/2,Math.PI*1.25,false,"green");
			drawCircle("design",55,heightSkills/2,37,0,Math.PI*2,false,"black");

			drawCircle("develop",55,heightSkills/2,50,Math.PI/2,Math.PI*1.5,true,"red");
			drawCircle("develop",55,heightSkills/2,50,Math.PI/2,Math.PI*1.35,false,"red");
			drawCircle("develop",55,heightSkills/2,37,0,Math.PI*2,false,"black");

			drawCircle("seo",55,heightSkills/2,50,Math.PI/2,Math.PI*1.5,true,"orange");
			drawCircle("seo",55,heightSkills/2,50,Math.PI/2,Math.PI*1.1,false,"orange");
			drawCircle("seo",55,heightSkills/2,37,0,Math.PI*2,false,"black");
		}

		if(winScroll >= $(".counting").offset().top - winHeight + winHeight/2){
			changeNumber(".projects-count", "projectsCount", "projectsMax", 30);
			changeNumber(".clients-count", "clientsCount", "clientsMax", 30);
			changeNumber(".certificates-count", "certificatesCount", "certificatesMax", 30);
			$("footer").css({"display" : "flex"}); // fix show footer when load page
		}

		if(winScroll > $(".blogs").offset().top - winHeight){
			var offset = winScroll - $(".blogs").offset().top + winHeight / 3;
			$(".blog-1").css({
				"transform": "translate("+ Math.min(0,offset) + "px," + -Math.min(0,offset)/2 + "px)" 
			});
			$(".blog-3").css({
				"transform": "translate("+ -Math.min(0,offset) + "px," + -Math.min(0,offset)/2 + "px)" 
			});
		}
	});

	//smooth scroll 
	$(".menu a[href*='#']").on("click", function(e){ 
		var anchor = $(this); 
		$('html, body').stop().animate({ 
			scrollTop: $(anchor.attr('href')).offset().top - 90 
		}, 1000); 
		e.preventDefault(); 
	}); 
});