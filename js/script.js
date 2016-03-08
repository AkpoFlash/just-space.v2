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
var percentSkills = {
	designCount : 0,
	designEnd : 87,
	developCount : 0,
	developEnd : 95,
	seoCount : 0,
	seoEnd : 78
}
var diagramSkills = {
	designCount : 0,
	designEnd : Math.PI*1.3,
	developCount : 0,
	developEnd : Math.PI*1.4,
	seoCount : 0,
	seoEnd : Math.PI*1.1
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

function drawDiagram(className,end,color){
	drawCircle(className,55,heightSkills/2,50,end,Math.PI*1.5,true,color);
	drawCircle(className,55,heightSkills/2,37,0,Math.PI*2,false,"black");
}

function delay(className,style,delay){
	setTimeout(function(){
		$(className).css(style);
	},delay);
}

function changeNumber(className, obj, count, max, interval, postfix){
	if(postfix === undefined){
		postfix = "";
	}
	setInterval(function(){
		if(obj[count] == obj[max]){
			return;
		}
		$(className).text(++obj[count]+postfix);
	},interval);	
}

function changeDiagram(className, obj, count, max, interval, color){
	setInterval(function(){
		if(obj[count] >= obj[max]){
			return;
		}
		obj[count] += 0.05;
		drawDiagram(className,obj[count],color);
	},interval);	
}

function drawCircle(id,x,y,r,start,end,flag,color){
	var canvas = document.getElementById(id);
	var obCanvas = canvas.getContext("2d");

	obCanvas.fillStyle = color;

	obCanvas.beginPath();
		obCanvas.moveTo(x,y);
		obCanvas.lineTo(x,y-r);
	obCanvas.closePath();

	obCanvas.beginPath();
		obCanvas.lineTo(x,y);
		obCanvas.arc(x,y,r,start,end,flag);
		obCanvas.fill();
	obCanvas.closePath();
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
			delay(".skill-1",{"transform":"translateX(0)"},0);
			delay(".skill-2",{"transform":"translateX(0)"},300);
			delay(".skill-3",{"transform":"translateX(0)"},600);

			heightSkills = $(".skills").height();
			$(".percent").css({"top":heightSkills/2-$(".percent").height()/2});
			$(".skill-text").css({"top":heightSkills/2-$(".percent").height()/2});

			changeDiagram("design", diagramSkills, "designCount", "designEnd", 31, "green");
			changeDiagram("develop", diagramSkills, "developCount", "developEnd", 32, "red");
			changeDiagram("seo", diagramSkills, "seoCount", "seoEnd", 30, "orange");
			
			changeNumber(".skill-1 .percent", percentSkills, "designCount", "designEnd", 30, "%");
			changeNumber(".skill-2 .percent", percentSkills, "developCount", "developEnd", 30, "%");
			changeNumber(".skill-3 .percent", percentSkills, "seoCount", "seoEnd", 30, "%");
		}

		if(winScroll >= $(".counting").offset().top - winHeight + winHeight/2){
			changeNumber(".projects-count", counting, "projectsCount", "projectsMax", 30);
			changeNumber(".clients-count", counting, "clientsCount", "clientsMax", 30);
			changeNumber(".certificates-count", counting, "certificatesCount", "certificatesMax", 30);
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