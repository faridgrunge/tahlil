/*<![CDATA[*/
/**
 * Waktu Sholat Javascript Library
 *
 * @author     Ahmad Amarullah <amarullz@yahoo.com>
 * @copyright  2011 Unikom Center <http://www.unikomcenter.com/>
 * @license    http://www.unikomcenter.com/license/ UnikomCenter License 1.0
 * @version    1.0.0
 */
(function(){
  window.waktuSholat=function(){
    /* Koordinate Default = Jakarta */
    
    /* Ikhtiyat/Kehati-hatian sebanyak 2 Menit */
    this.Ikhtiyat   = 2;
    
    /**
     * Set Latitude & Longitude
     * @sintax
     *   void Object.setLatLng(float Latitude, float Longitude);
     */
    this.setLatLng=function(lat,lng){
      this.latitude=lat;
      this.longitude=lng;
    };
    
    /**
     * Fungsi untuk meng-convert nilai Float untuk jam
     * menjadi array [Jam,Menit,Detik] atau string jam "12:1:9"
     * @sintax
     *   string/array Object.calc_toTime(float flTime, bool ReturnArray); 
     */
    this.calc_toTime=function(num,retarray){
      var jam = Math.floor(num);
      var vmn = (num-jam)*60;
      var mnt = Math.floor(vmn);
      var dtk = Math.round((vmn-mnt)*60);
      var ret = [jam,mnt,dtk];
      if (retarray) return ret;
      return ret.join(':');
    };
    /* Fungsi Untuk Convert calc_toTime menjadi
       Friendly Time format dengan leading 0 pada jam,menit
       dan detik. Output format: 12:01:09
    */
    this.timeToString=function(num){
      var arr = this.calc_toTime(num,true);
      arr[0]+=''; arr[1]+=''; arr[2]+='';
      if (arr[0].length==1) arr[0]='0'+arr[0];
      if (arr[1].length==1) arr[1]='0'+arr[1];
      if (arr[2].length==1) arr[2]='0'+arr[2];
      return arr.join(':');
    };

    /**
     * Fungsi untuk mendapatkan Nilai Integer dari Julian Date
     * @sintax
     *   [JD] Object.jd(int Tahun, int Bulan, int Tanggal, int TimeZone); 
     */
    this.jd=function(thn,bln,tgl,tz){
      if (bln<=2){
        bln+=12;
        thn--;
      }
      var UT = 12-tz;
      // Nilai 1 Tahun = 365.25 Hari ( 366 = 1x kabisat, 365 = 3x )
      // Nilai 1 Bulan = 30.6001 Hari
      // Alghoritma dapat dibaca di: http://www.gmat.unsw.edu.au/snap/gps/gps_survey/chap2/214.htm
      var jd = Math.floor(365.25 * thn) + Math.floor(30.6001 * (bln+1)) + tgl + (UT/24) + 1720981.5;
      return jd;
    };
    
    /**
     * Julian Date untuk 1 Januari 2000 (UTC)
     * diperlukan untuk perhitungan jumlah hari dan
     * abad untuk hari yang dimaksud.
     */
    this.JD2000     = this.jd(2000,1,1,0);
    
    /**
     * Fungsi untuk menghitung jumlah hari dari satu
     * JD ke JD yang lainnya
     * @sintax
     *   [n] Object.jd_jumlahHari([JD] From,[JD] To);
     */
    this.jd_jumlahHari=function(jd_from,jd_to){
      return jd_to-jd_from;
    };

    /**
     * Fungsi untuk menghitung jumlah abad untuk
     * jumlah hari yang dimaksud.
     * @sintax
     *   [T] Object.jd_jumlahAbad([JD] jumlahHari);
     */
    this.jd_jumlahAbad=function(jumlahHari){
      /* Jumlah Hari dalam 1 Abad = 36525 Hari */
      return jumlahHari/36525;
    };
    
    /**
     * Fungsi untuk menghitung bujur ekliptik rata-rata matahari
     * @sintax
     *   [g] Object.elip_ratarata([T] jumlahAbad);
     */
    this.elip_ratarata=function(T){
      var g_awal= 280.46 + (36000.77129 * T);
      var g     = g_awal;
      if (g_awal>360){
        var cg = 360 * Math.floor(g_awal/360);
        g -= cg;
      }
      return g;
    };
    
    var M={
      deg2rad:function(d){
        return (d / 180) * Math.PI;
      },
      rad2deg:function(d){
        return d * 57.29577951308232;
      },
      sin:function(d){
        return Math.sin(M.deg2rad(d));
      },
      cos:function(d){
        return Math.cos(M.deg2rad(d));
      },
      tan:function(d){
        return Math.tan(M.deg2rad(d));
      },
      acos:function(r){
        return M.rad2deg(Math.acos(r));
      },
      asin:function(r){
        return M.rad2deg(Math.asin(r));
      },
      atan:function(r){
        return M.rad2deg(Math.atan(r));
      },
    };
    
    /**
     * Fungsi untuk menghitung bujur ekliptik matahari
     * @sintax
     *   [L0] Object.elip_bujur([T] jumlahAbad);
     */
    this.elip_bujur=function(T){
      var b_awal = 357.528+(35999.05096*T);
      var c_b    = 360 * Math.floor(b_awal/360);
      var b      = b_awal - c_b;
      var lo     = this.elip_ratarata(T) + (1.915 * M.sin(b)) + (0.02 * M.sin(2*b));
      return lo;      
    };
    
    /**
     * Fungsi untuk menghitung kemiringan ekliptik matahari
     * @sintax
     *   [E] Object.elip_kemiringan([n] jumlahHari);
     */
    this.elip_kemiringan=function(n){
      return 23.439-0.0000004*n;
    };
    
    /**
     * Fungsi untuk menghitung Aksensio rekta matahari
     * @sintax
     *   [Ra0] Object.cari_ra0([L0] elipBujur, [E] Kemiringan);
     */
    this.cari_ra0=function(L0, E){
      var _L0    = L0;
      var _E     = E;
      var cos_L0 = M.cos(_L0);
      
      var Ra01   = M.atan((M.sin(_L0) * M.cos(_E)) / cos_L0);
      var Ra02   = Ra01;
      if (cos_L0>=0)
        Ra02+=360;
      else
        Ra02+=180;
      var CRa = 360 * Math.floor(Ra02/360);
      var Ra0 = Ra02-CRa;
      return Ra0;
    };
    
    /**
     * Fungsi untuk menghitung deklinasi matahari
     * @sintax
     *   [d0] Object.cari_deklinasi([L0] elipBujur, [E] Kemiringan);
     */
    this.cari_deklinasi=function(L0,E){
      var d0 = M.asin(M.sin(L0) * M.sin(E));
      return d0;
    };
    
    /**
     * Fungsi untuk menghitung Meridian Pas
     * @sintax
     *   [MP] Object.cari_meridianpas([Ra0] Aksensio, [g] elip_ratarata);
     */
    this.cari_meridianpas=function(Ra0,g){
      var MP = (12-((g-Ra0)/15));
      if (MP<0)
        MP+=24;
      else if(MP>24)
        MP-=24;
      return MP;
    };
    
    /**
     * Fungsi untuk menghitung Koreksi Waktu Daerah
     * @sintax
     *   [KWD] Object.calc_kwd(int TimeZone,float Longitude);
     */
    this.calc_kwd=function(tz,longitude){
      var KWD = tz - (longitude/15);
      return KWD;
    };
    
    /**
     * Fungsi Untuk menghitung Waktu pada kondisi-kondisi tertentu
     *  [WAKTU] Object.calcWaktu([d0],float,[KWD],[MP],int DerajatMatahari);
     */
    this.calcWaktu=function(d0,latitude,KWD,MP,Z){
      var t = 0;
      if (Z!=0){
        var _Z   = Math.abs(Z);
        var cosZ = (M.cos(_Z) - M.sin(d0) * M.sin(latitude)) / (M.cos(d0) * M.cos(latitude));
        t = M.acos(cosZ) / 15;
        if (Z<0) t = 0-t;
      }
      var Waktu = MP + t + KWD + (this.Ikhtiyat/60);
      return Waktu;
    };
    
    /**
     * Fungsi Untuk Mendapatkan Waktu Sholat
     * Berdasarkan Thn, Bln, Tgl dan TimeZone.
     */
    this.get=function(thn,bln,tgl,gmt){
      //-- Bila tidak di set, Set sebagai WIB / GMT+7
      if (!gmt) gmt=7;
      
      //-- Hitung Julian Date hari yang dimaksud
      var JD     = this.jd(thn,bln,tgl,gmt);
      //-- Hitung jumlah Hari dari 1 Jan 2000 sampai tgl yg dimaksud
      var n      = this.jd_jumlahHari(this.JD2000,JD);
      //-- Hitung jumlah Abad dari 1 Jan 2000 sampai tgl yg dimaksud
      var T      = this.jd_jumlahAbad(n);
      //-- Hitung Bujur ekliptik rata-rata matahari
      var g      = this.elip_ratarata(T);
      //-- Hitung Bujur ekliptik matahari
      var Lo     = this.elip_bujur(T);
      //-- Hitung kemiringan ekliptik matahari
      var E      = this.elip_kemiringan(n);
      //-- Hitung Aksensio rekta matahari
      var Ra0    = this.cari_ra0(Lo, E);
      //-- Hitung Deklinasi matahari
      var d0     = this.cari_deklinasi(Lo,E);
      //-- Hitung Meridian Pas
      var MP     = this.cari_meridianpas(Ra0,g);
      //-- Hitung Koreksi Waktu Daerah
      var KWD    = this.calc_kwd(gmt,this.longitude);
          
      /* List Posisi Matahari Berdasarkan Waktu Shalat */
      var posMatahari = {
        'zuhur':0,
        /* Ashar tergantung koordinat latitude dari suatu daerah */
        'ashar':M.atan(M.tan(Math.abs(d0-this.latitude))+1),
        'maghrib':91,
        'isya':108,
        'shubuh':-110,
		'imsak':-112.307
      };
      
      var waktuSholat=[];
      for (var waktu in posMatahari){
        waktuSholat[waktu]=this.timeToString(this.calcWaktu(d0,this.latitude,KWD,MP,posMatahari[waktu]));
      };
      return waktuSholat;
    }
  };
})();