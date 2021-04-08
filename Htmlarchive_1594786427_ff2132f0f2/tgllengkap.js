dN = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
mN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
pN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

dW = "<html><head><style type='text/css'>table{width:464px;height:464px;font-family:arial;font-weight:bold;font-size:14px;cursor:default;}td{width:64px;height:"
+ "32px;background-color:#f5f5f5;text-align:center;}input{width:28px;height:24px;font-family:arial;font-weight:normal;font-size:14px;cursor:pointer;}.myh{width"
+ ":196px;font-size:16px;color:#ff9000;}.dy,.dyh{color:#0000ff;}.jm,.jmh{color:#009f00;}.st,.sth{color:#bf00cf;}.mg,.mgh{color:#ff0000;}.dy,.jm,.st,.mg{height:"
+ "64px;font-size:12px;}.dyh,.jmh,.sth,.mgh{font-size:14px;}.clk{width:196px;height:64px;font-size:44px;color:#00afff;}.dte{width:130px;font-size:16px;color:#f"
+ "f00cf;}</style></head><body onSelectStart='return false;'><table border='1' borderColor='#808080' cellSpacing='0' cellPadding='0'><tr><td colSpan='2' style="
+ "'width:130px;'><input type='button' onClick='chgMth(0,100);' title='-100 tahun' value='&lt;&lt;'/>\n<input type='button' onClick='chgMth(0,10);' title='-10 "
+ "tahun' value='&lt;&lt;'/>\n<input type='button' onClick='chgMth(0,1);' title='-1 tahun' value='&lt;&lt;'/>\n<input type='button' onClick='chgMth(1,0);' titl"
+ "e='-1 bulan' value='&lt;&lt;'/></td><td colSpan='3' class='myh' id='mTyR'/><td colSpan='2' style='width:130px;'><input type='button' onClick='chgMth(3,0);' "
+ "title='+1 bulan' value='&gt;&gt;'/>\n<input type='button' onClick='chgMth(4,1);' title='+1 tahun' value='&gt;&gt;'/>\n<input type='button' onClick='chgMth(4"
+ ",10);' title='+10 tahun' value='&gt;&gt;'/>\n<input type='button' onClick='chgMth(4, 100);' title='+100 tahun' value='&gt;&gt;'/></td></tr><tr><td class='mg"
+ "h'>" + dN[0] + "</td><td class='dyh'>" + dN[1] + "</td><td class='dyh'>" + dN[2] + "</td><td class='dyh'>" + dN[3]
+ "</td><td class='dyh'>" + dN[4] + "</td><td class='jmh'>" + dN[5] + "</td><td class='sth'>" + dN[6] + "</td></tr>";
var n = 5;
for (i = 0; i <= 34; i++) {
	ftr = "";
	etr = "";
	cls = "";
	if (i == (n - 5)) {
		ftr = "<tr>";
		cls = "mg";
	} else if (i == n) {
		cls = "jm";
		n += 7;
	} else if (i == ((n - 7)  + 1)) {
		etr = "</tr>";
		cls = "st";
	} else {
		cls = "dy";
	}
	dW += ftr + "<td colSpan='1' class='" + cls + "' id='iD" + i + "'/>" + etr;
}
dW += "<tr><td colSpan='1' rowSpan='2' class='mg' id='iD35'/><td colSpan='1' rowSpan='2' class='dy' id='iD36'/><td colSpan='3' rowSpan='2' class='clk' id='sh"
+ "owClock'/><td colSpan='2' class='dte' id='showDate'/></tr><tr><td colSpan='2' class='dte' style='color:#00cf00;' id='showDay'/></tr></table></body></html>";

document.write(dW);
chgMth(2, 0);
chgClk();

function chgMth(i, y) {
	dT = new Date();
	if (i == 0) {
	yR -= y;
	if (yR < 100) {
		yR = 100;
	}
	}
	if (i == 1) {
	if (mT > 0) {
		mT--;
	} else {
		if (yR == 100) {
		mT = 0;
		} else {
		mT = 11;
		yR--;
		}
	}
	}
	if (i == 2) {
	mT = dT.getMonth();
	yR = dT.getFullYear();
	}
	if (i == 3) {
	if (mT < 11) {
		mT++;
	} else {
		if (yR == 250000) {
		mT = 11;
		} else {
		mT = 0;
		yR++;
		}
	}
	}
	if (i == 4) {
	yR += y;
	if (yR > 250000) {
		yR = 250000;
	}
	}
	for (cN = 0; cN <= 36; cN++) {
	document.getElementById("iD" + cN).style.backgroundColor = "#dcdcff";
	}
	cN = new Date(yR, mT, 1).getDay();
	for (dY = new Date(yR, mT, 0).getDate() - (cN - 1), bI = 0; bI < cN; dY++, bI++) {
	document.getElementById("iD" + bI).innerHTML = "<font style='font-size: 20px; color: #808080;'>" + dY + "</font>";
	}
	for (dY = 1; dY <= new Date(yR, (mT + 1), 0).getDate(); dY++, cN++) {
	pS = (((new Date(yR, mT, dY).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5);
	document.getElementById("iD" + cN).innerHTML = "<font style='font-size: 28px;'>" + dY + "</font><br/>" + pN[pS];
	if (dY == dT.getDate() & mT == dT.getMonth() & yR == dT.getFullYear()) {
		document.getElementById("iD" + cN).style.backgroundColor = "#ffff88";
	}
	}
	for (dY = 1; cN <= 36; dY++, cN++) {
	document.getElementById("iD" + cN).innerHTML = "<font style='font-size: 20px; color: #808080;'>" + dY + "</font>";
	}
	mTyR.title = mN[dT.getMonth()] + " " + dT.getFullYear();
	mTyR.innerHTML = "<font onClick='chgMth(2, 0);' style='cursor: pointer;'>" + mN[mT] + "&nbsp;" + yR + "</font>";
}

function chgClk() {
	dTcL = new Date();
	hRcL = dTcL.getHours();
	mNcL = dTcL.getMinutes();
	sCcL = dTcL.getSeconds();
	dYcL = dTcL.getDate();
	mTcL = dTcL.getMonth();
	yRcL = dTcL.getFullYear();
	if (mTcL == 7) {
	mMcL = "Ags";
	} else {
	mMcL = mN[mTcL].substr(0, 3);
	}
	if (dYcL < 10) {
	dYcL = "0" + dYcL;
	}
	if (hRcL < 10) {
	hRcL = "0" + hRcL;
	}
	if (mNcL < 10) {
	mNcL = "0" + mNcL;
	}
	if (sCcL < 10) {
	sCcL = "0" + sCcL;
	}
	if (showDate.innerHTML != dYcL + "&nbsp;" + mMcL + "&nbsp;" + yRcL) {
	chgMth(5, 0);
	}
	pScL = (((new Date(yRcL, mTcL, dYcL).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5);
	showClock.innerHTML = hRcL + ":" + mNcL + ":" + sCcL;
	showDate.innerHTML = dYcL + "&nbsp;" + mMcL + "&nbsp;" + yRcL;
	showDay.innerHTML = dN[dTcL.getDay()] + "&nbsp;" + pN[pScL];
	setTimeout("chgClk();", 100);
}