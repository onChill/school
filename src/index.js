import './style/app.scss';
import 'bootstrap';
import './js/components/my-swiper'
import './js/components/offcanvas-show_hide'
import /* webpackChunkName: "svg" */ "./js/svg-include";


function onPageLoad() {
    require('./js/app');
}

if (document.body) onPageLoad();
else document.addEventListener('DOMContentLoaded', onPageLoad);








