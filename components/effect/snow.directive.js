angular.module('waApp')
	.directive("snow", [function() {
		return {
			restrict: 'E',
			template: '<canvas></canvas>',
			replace: true,
			link: function(scope, element, attributes) {
				var settings = {
						speed: 0,
						interaction: true,
						size: 1,
						count: 200,
						opacity: 0,
						color: "#ffffff",
						windPower: 0,
						image: false
					},
					flakes = [],
					canvas = element[0];
					ctx = canvas.getContext("2d"),
					flakeCount = 0,
					mX = -100,
					mY = -100;

				(function() {
					var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
						function(callback) {
							window.setTimeout(callback, 1000 / 60);
						};
					window.requestAnimationFrame = requestAnimationFrame;
				})();

				function SnowDown() {
					if (flakes.length == 0) {
						SonwNub = 1;
						flakeCount = 0
					}
					if (flakeCount < SonwNub) {
						var x = Math.floor(Math.random() * canvas.width),
							y = Math.floor(Math.random() * canvas.height - canvas.height);
						size = (Math.random() * 0.05) + settings.size,
							opacity = 0.5;
						speed = (Math.random() * 1) + settings.speed / 2 + 0.2;
						flakeCount++;
						flakes.push({
							speed: speed,
							velY: speed,
							velX: 0,
							x: x,
							y: y,
							size: size,
							stepSize: (Math.random()) / 30,
							step: 0,
							angle: 90,
							opacity: opacity
						});
					}
					SonwNub < 150 && (SonwNub += 0.1);
					ctx.clearRect(0, 0, canvas.width, canvas.height);

					for (var i = 0; i < flakes.length; i++) {
						var flake = flakes[i],
							x = mX,
							y = mY,
							minDist = 100,
							x2 = flake.x,
							y2 = flake.y;

						var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
							dx = x2 - x,
							dy = y2 - y;

						if (dist < minDist) {
							var force = minDist / (dist * dist),
								xcomp = (x - x2) / dist,
								ycomp = (y - y2) / dist,
								deltaV = force / 2;

							flake.velX -= deltaV * xcomp;
							flake.velY -= deltaV * ycomp;

						} else {
							flake.velX *= .98;
							if (flake.velY <= flake.speed) {
								flake.velY = flake.speed + 0.002 * flakeCount;
							}

							switch (settings.windPower) {
								case false:
									flake.velX += Math.random() * Math.random() * Math.cos(flake.step += .10) * flake.stepSize;
									break;

								case 0:
									flake.velX += Math.random() * Math.cos(flake.step += .10) * flake.stepSize;
									break;

								default:
									flake.velX += Math.random() * (0.01 + (settings.windPower / 100));
							}
						}

						var s = settings.color;
						var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
						var matches = patt.exec(s);
						var rgb = parseInt(matches[1], 16) + "," + parseInt(matches[2], 16) + "," + parseInt(matches[3], 16);


						flake.y += flake.velY;
						flake.x += flake.velX;

						if (flake.y >= canvas.height) {
							reset(flake);
						}


						if (flake.x >= canvas.width || flake.x <= 0) {
							reset(flake);
						}
						if (settings.image == false) {
							ctx.fillStyle = "rgba(" + rgb + "," + flake.opacity + ")"
							ctx.beginPath();
							ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
							ctx.fill();
						} else {

							ctx.drawImage($("img#lis_flake").get(0), flake.x, flake.y, flake.size * 2, flake.size * 2);
						}

					}
					requestAnimationFrame(SnowDown);
				};

				function reset(flake) {
					if (settings.windPower == false || settings.windPower == 0) {
						flake.x = Math.floor(Math.random() * canvas.width);
						flake.y = 0;
					} else {
						if (settings.windPower > 0) {
							var xarray = Array(Math.floor(Math.random() * canvas.width), 0);
							var yarray = Array(0, Math.floor(Math.random() * canvas.height))
							var allarray = Array(xarray, yarray)

							var SelectedArray = allarray[Math.floor(Math.random() * allarray.length)];

							flake.x = SelectedArray[0];
							flake.y = SelectedArray[1];
						} else {
							var xarray = Array(Math.floor(Math.random() * canvas.width), 0);
							var yarray = Array(canvas.width, Math.floor(Math.random() * canvas.height))
							var allarray = Array(xarray, yarray)

							var SelectedArray = allarray[Math.floor(Math.random() * allarray.length)];

							flake.x = SelectedArray[0];
							flake.y = SelectedArray[1];
						}
					}

					flake.size = (Math.random() * 0.1) + settings.size;
					flake.speed = (Math.random() * 1) + settings.speed;
					flake.velY = flake.speed;
					flake.velX = 0;
					flake.opacity = 0.5;
				}

				SnowDown();
			}
		}
	}])