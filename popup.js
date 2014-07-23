var i18n = window.navigator.language;

function setI18n(){
	if (i18n == 'zh-CN') {
		downloadBtn.value = '下载并更新！';
		hint_message_text0.innerText = '已安装的版本：';
		hint_message_text2.innerText = '已安装的 Build：';
		hint_message_text1.innerText = '最新 Build 版本：';
	}
	else if (i18n == 'zh-TW' || i18n == 'zh-HK') {
		downloadBtn.value = '下載并更新！';
		hint_message_text0.innerText = '已安裝的版本：';
		hint_message_text2.innerText = '已安裝的 Build：';
		hint_message_text1.innerText = '最新 Build 版本：';
	}
	else if (i18n == 'ja' || i18n == 'ja-JP') {
		downloadBtn.value = 'ダウンロードや更新チェック！';
		hint_message_text0.innerText = 'インストールされているバージョン：';
		hint_message_text2.innerText = 'ビルドがインストール：';
		hint_message_text1.innerText = '最新のビルド：';
	}
}

setTimeout(setI18n,0);
setTimeout(function(){document.getElementById('hint_message_text0').innerText += window.navigator.userAgent.match(/Chrome\/([\d.]+)/)[1];}, 500);
setTimeout("currentBuild()", 1000);
setTimeout("checkVer()", 2000);
setTimeout("matchVersion()", 3000);

var currentBuild, latestVer, downloadURL;
var versionNumber = navigator.appVersion.match(/Chrome\/[0-9]{2}[.][0-9]+[.]([0-9]+)[.][0-9]+/)[1];

/*function currentBuild(){
	var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
			currentBuild = ajax.response.match(/"cl":"([\d.]+)"/)[1];
			document.getElementById('hint_message_text2').innerText += currentBuild;
			}
		}
    ajax.open('GET', 'chrome://version/strings.js', true);
    ajax.send();
}*/

function currentBuild(){
	var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            currentBuild = ajax.response.match(/"><strong>([0-9]+)<\/strong>/)[1];
			document.getElementById('hint_message_text2').innerText += currentBuild;
			}
		}
    ajax.open('GET', 'http://src.chromium.org/viewvc/chrome/branches/' + versionNumber, true);
    ajax.send();
}

function checkVer(){
	var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
			latestVer = ajax.response;
			document.getElementById('hint_message_text1').innerText += latestVer;
			downloadURL = 'http://commondatastorage.googleapis.com/chromium-browser-snapshots/Win/' + latestVer + '/mini_installer.exe';
			}
		}
    ajax.open('GET', 'http://commondatastorage.googleapis.com/chromium-browser-snapshots/Win/LAST_CHANGE', true);
    ajax.send();
}

function download(){
	window.open(downloadURL);
}

function matchVersion(){
    if (currentBuild < latestVer) {
        document.getElementById('hint_message_text3').innerText = 'Your Chromium is out of date. Please update!';
        downloadBtn.addEventListener('click', download);
        downloadBtn.disabled = false;
	}
    else if (currentBuild >= latestVer) {
        document.getElementById('hint_message_text3').innerText = 'You are using current version of Chromium!';
	}
}