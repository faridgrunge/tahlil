function resizeText(multiplier) {
					if (document.getElementById('pText').style.fontSize == "") {
						document.getElementById('pText').style.fontSize = "1.0em";
						}
						document.getElementById('pText').style.fontSize = parseFloat(document.getElementById('pText').style.fontSize) + (multiplier * 0.2) + "em";
					}
					
					function resizeText2(multiplier) {
						var paragraphs = document.getElementsByTagName("p");　　　　
						for (var i = 0; i < paragraphs.length; i++) {　　　　
							if (paragraphs[i].style.fontSize == '') {
								paragraphs[i].style.fontSize = "1.0em";
							}
							paragraphs[i].style.fontSize = parseFloat(paragraphs[i].style.fontSize) + (multiplier * 0.2) + "em";
						}
					}