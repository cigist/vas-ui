/* @ngInject */
function queryUrl(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
};
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var delete_cookie = function (cvalue) {
    document.cookie = cvalue + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
function deleteCookies() {
  var _data = {
      _id: '',
      _name: '',
      _token:''
  }
    delete_cookie("token");
    localStorage.setItem('_usrdtaex',JSON.stringify(_data));
    window.location = "index.html";
}
function getParam() {
    var _data = {
        _id: queryUrl('uid'),
        _name: '',
        _token: queryUrl('token')
    }
    if (queryUrl('xnikita') === 'true') {
        localStorage.setItem('_usrdtaex', JSON.stringify(_data));
    }
}
// getParam();
function loadingShow(){
    $.LoadingOverlay("show", {
        image: "./images/loading.gif"
    });
}
function loadingHide(){
    $.LoadingOverlay("hide");
}
