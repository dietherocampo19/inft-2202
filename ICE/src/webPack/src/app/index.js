import listBuilder from "./animals/list.js";
import animalBuilder from "./animals/index.js";
import coverBuilder from "./views/cover.ejs"
import twitter from '../asset/twitter.svg';

function app(container) {
    var appObj = {
        recordPage: { page: 1, perPage: 10 },
        name: null,

        listBuilder: function(app) {
            app.name = null;
            navItems.forEach(item => {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            });

            navItems[2].classList.add('active');
            navItems[2].setAttribute('aria-current', 'page');
            container.innerHTML = '';
            container.append(listBuilder(app).element);
        },

        contactBuilder: function(app) {
            navItems.forEach(item => {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            });

            navItems[3].classList.add('active');
            navItems[3].setAttribute('aria-current', 'page');
            container.innerHTML = '';
            container.append(contactBuilder(app).element);
        },

        aboutBuilder: function(app) {
            app.name = null;
            navItems.forEach(item => {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            });

            navItems[4].classList.add('active');
            navItems[4].setAttribute('aria-current', 'page');
            container.innerHTML = '';
            container.append(aboutBuilder(app).element);
        },

        coverBuilder: function(app) {
            app.name = null;
            navItems.forEach(item => {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            });

            navItems[0].classList.add('active');
            navItems[0].setAttribute('aria-current', 'page');
            container.innerHTML = '';

            // Adding the three background images of "everything is object"
            container.innerHTML = `
                <img src='./img/everything_is_object1.png'>
                <img src='./img/everything_is_object2.png'>
                <img src='./img/everything_is_object3.png'>
            `;
        }
    };

    const router = async () => {
        match.route.view(appObj);
    };

    window.addEventListener('popstate', router);

    document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                navigateTo(e.target.href);
            }
        });
    });

    const navigateTo = (url) => {
        history.pushState(null, null, url);
        router();
    };

    const routes = [
        { path: '/', view: () => appObj.coverBuilder(appObj) },
        { path: '/animal', view: () => appObj.animalBuilder(appObj) },
        { path: '/list', view: () => appObj.listBuilder(appObj) },
        { path: '/contact', view: () => appObj.contactBuilder(appObj) },
        { path: '/about', view: () => appObj.aboutBuilder(appObj) }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    match.route.view(appObj);

    let footImgs = document.querySelector('.ms-a');
    let svgElement = document.createElement('img');
    svgElement.src = twitter;
    svgElement.width = 24;  // width in pixels
    svgElement.height = 24; // height in pixels
    footImgs.appendChild(svgElement);
}

export default app;