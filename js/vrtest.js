var optionArr = new Array();

// 옵션 텍스트명
/*
옵션 목록 옵션 제목
*/
var optionText = ['칼라선택'];

// 옵션 종류
/*
옵션 종류 key 값
*/
var optionName = ['color'];

// 옵션 별 리스트
/*
각 옵션에 대한 리스트
*/
var optionList = [
    ['', '', ''], /* color 에 대한 리스트 */
                              /* 두번째 옵션에 대한 리스트 */
 
];

// 옵션별 이미지
/*
옵션리스트 만큼 추가해서 표시
ex)
옵션 종류가 2개일 경우
[option1, option2, img.gltf, img.usdz]
옵션 종류가 3개일 경우
[option1, option2, option3, img.gltf, img.usdz]
*/
var optionImg = [
    ['','', ''],
];


$(function () {

    // 위에서 입력한 옵션 데이터를 가지고 화면에 옵션 리스트를 그려준다
    $.each(optionName, function (i, v) {
        var optHtml = '';
        optHtml += '        <div class="perOpt">';
        optHtml += '            <p class="optTitle">'+optionText[i]+'</p>';
        optHtml += '            <ul id="ul_'+optionName[i]+'" class="sel_ul">';
        $.each(optionList[i], function (j, v) {
            optHtml += '                <li><a href="javascript:void(0);" data-value="'+optionList[i][j]+'">'+optionList[i][j]+'</a></li>';
        });
        optHtml += '            </ul>';
        optHtml += '        </div>';
        console.log(optHtml);
        $("#div_Option").append(optHtml);
    });

    // 옵션 선택창 열기
    $(".openOpt a").click(function () {
        $(".optWrap").addClass("on");
        $(".fixFunc.inner").show();
    });

    // 확인 버튼 클릭 시
    $(".btnConfirm a").click(function () {
        $(".optWrap").removeClass("on");
        $(".fixFunc.inner").hide();

        // 모든 옵션을 선택했을 경우 화면에 이미지를 노출하게 하고 하단에 선택한 옵션을 텍스트로 보여준다
        if(chkOption()) {
            $("#div_Cover").hide();
            $("#ar-button").show();
            var optTxt = '';
            $.each(optionArr, function (i, v) {
                if(i!=0) {
                    optTxt += ','+v;
                }else {
                    optTxt += v;
                }
            });

            $(".openOpt a").html('옵션: '+optTxt);
        }
    });

    // 옵션 선택 시
    $(".sel_ul a").on('click', function() {
        $(this).parents('ul').find('a').removeClass("on");
        $(this).toggleClass("on");

         // 모든 옵션을 선택했는지 확인 후 화면에 이미지를 노출해 준다
        if(chkOption()){
            setSrc(optionArr);
            $("#div_Cover").hide();
        }
    });

	var tt = $("#duck")[0].shadowRoot;
	tt.querySelector('.container').querySelector('div .ar-button').style.display='block';
	// tt.querySelector('#default-ar-button').style.bottom='80px';
	tt.querySelector('#default-ar-button').style.right='1%';

});

/*
 - 선택합 옵션에 맞는 이미지 선택
 선택한 옵션의 배열값을 가져와 optionImg 배열에 일치하는 값의 이미지 파일을 화면에 표시해 준다

*/
function setSrc(arrValue) {
    for(var i=0; i<optionImg.length; i++) {
        var tmpArr = optionImg[i];
        var resultCnt = 0;
        for(var j=0; j<optionName.length; j++) {
            if(tmpArr[j] == arrValue[j]){
                resultCnt = resultCnt+1;
            }
        }
        if(resultCnt==optionName.length) {
            console.log(optionImg[i][optionName.length]);
            console.log(optionImg[i][optionName.length+1]);
            $("#duck").attr("src", optionImg[i][optionName.length]);
            $("#duck").attr("iosSrc", optionImg[i][optionName.length]+1);
        }
    }
}

/*
 - 옵션 선택 여부 확인
 옵션의 값을 모두 선택했는 지 여부를 true, false 로 전달해 준다

*/
function chkOption() {
    var optionCnt = 0;
    optionArr = new Array();
    $.each(optionName, function(i, v){
        if($("#ul_"+optionName[i]).find("a[class=on]").length>0) {
            optionCnt = optionCnt+1;
            optionArr.push($("#ul_"+optionName[i]).find("a[class=on]").data("value"));
        }
    });

    if(optionCnt==optionName.length){
        return true;
    } else {
        return false;
    }
}