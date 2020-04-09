var clicks = 0;
var auto_clicks = 0;
var cost = 1;
var upgrade_speed = 0;
var click_rate = 1000;
var interval_auto;
var click_increment = 1

function update_total_clicks() { 
    var e = document.getElementById("total_clicks");
    e.innerHTML = clicks;
}

function buy_something(c, button) {
    if (clicks < c) {
        button.className = 'btn btn-danger';
        setTimeout(function() {
            var e = document.getElementsByClassName("btn-danger")[0];
            e.className = 'btn btn-success';
        }, 1000);
        return false;
    }
    clicks -= c;
    return true;
}

function update_workers() {
    var e2 = document.getElementById("time_period");
    e2.innerHTML = parseFloat(click_rate / 1000.0).toFixed(2);
    clearInterval(interval_auto);
    interval_auto = setInterval(function() {
        clicks += auto_clicks;
        update_total_clicks();
    }, click_rate);
}

document.getElementById("click").onclick = function() {
    clicks = parseFloat(clicks) + parseFloat(click_increment);
    update_total_clicks();
};
document.getElementById("buy_click").onclick = function() {
    if (!buy_something(cost, this)) return;
    auto_clicks++;
    cost = Math.pow(2, auto_clicks);
    update_total_clicks();
    var e = document.getElementById("clicks_per_second");
    e.innerHTML = auto_clicks;
    var e2 = document.getElementById("buy_click");
    e2.innerHTML = 'Buy for ' + cost;
    var e2 = document.getElementById("autoclicker_level");
    e2.innerHTML = 'lvl  ' + auto_clicks;
};
document.getElementById("upgrade_speed").onclick = function() {
    var upgrade_cost = (Math.pow(3, upgrade_speed)) * 100;
    if (!buy_something(upgrade_cost, this)) return;
    upgrade_speed++;
    click_rate = click_rate * 0.90;
    update_workers();
    var e2 = document.getElementById("upgrade_speed");
    e2.innerHTML = 'Buy for ' + ((Math.pow(3, upgrade_speed)) * 100);
    var e2 = document.getElementById("speed_level");
    e2.innerHTML = 'lvl  ' + upgrade_speed;
};

document.getElementById("increase_clicks").onclick = function() {
    var upgrade_cost = (Math.pow(3, click_increment)) * 1;
    if (!buy_something(upgrade_cost, this)) return;
    click_increment++;
    update_workers();
    var e2 = document.getElementById("click_increment");
    e2.innerHTML = 'Buy for ' + ((Math.pow(3, click_increment)) * 100);
};
