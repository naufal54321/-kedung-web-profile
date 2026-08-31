import ProfilHero from '../components/Profil/ProfilHero';
import SEO from '../components/SEO';
import { FaLandmark, FaHistory, FaUsers, FaShieldAlt } from 'react-icons/fa';

function Sejarah() {
  return (
    <main className="profil-page">
      <SEO title="Sejarah" description="Sejarah berdirinya Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta." />
      <ProfilHero
        title="Sejarah Padukuhan"
        subtitle="Mengenal asal-usul dan perjalanan Padukuhan Kedung dari masa ke masa"
      />
      <div className="container py-4">
        <div className="vm-card" data-aos="fade-up">
          <div className="vm-icon vm-icon-visi">
            <FaLandmark />
          </div>
          <h3 className="vm-title">Sejarah Padukuhan</h3>
          <p className="vm-text">
            Padukuhan Kedung terletak di Kalurahan Guwosari, Kecamatan Pajangan,
            Kabupaten Bantul. Padukuhan Kedung memiliki 4 RT, yang terdiri dari
            RT 1, RT 2, RT 3 dan RT 4. Setiap RT memiliki ciri khasnya sendiri.
            Jumlah penduduk di Padukuhan Kedung tergolong ramai berdasarkan KK
            (Kartu Keluarga) yang ada di Padukuhan Kedung.
          </p>
        </div>

        <div className="vm-card" data-aos="fade-up" data-aos-delay="100">
          <div className="vm-icon vm-icon-misi">
            <FaHistory />
          </div>
          <h3 className="vm-title">Asal-usul Nama "Kedung"</h3>
          <p className="vm-text">
            Menurut tradisi lokal dan catatan budaya setempat, nama "Kedung" mengacu
            pada kondisi alam di wilayah tersebut. Padukuhan Kedung meskipun berada
            di dataran pegunungan, memiliki sumber air yang sangat melimpah pada
            cekungan atau kolam alami di daerah itu. Dalam bahasa Jawa, "kedung"
            memang berarti lubuk atau kolam di sungai. Situs Desa Budaya Guwosari
            mencatat bahwa padukuhan ini dinamai Kedung karena adanya sumber mata
            air yang melimpah dalam kedung (kolam). Dengan kata lain, keberadaan
            mata air besar di hamparan kolam alam itulah yang diyakini menjadi
            asal-usul penamaan Dusun Kedung.
          </p>
          <a
            href="https://budaya.guwosari.desa.id"
            target="_blank"
            rel="noopener noreferrer"
            className="vm-source-link"
          >
            Sumber: budaya.guwosari.desa.id
          </a>
        </div>

        <div className="vm-card" data-aos="fade-up" data-aos-delay="200">
          <div className="vm-icon vm-icon-misi">
            <FaShieldAlt />
          </div>
          <h3 className="vm-title">Sejarah Bregodo Suryeng Laga</h3>
          <p className="vm-text">
            Bregodo Suryeng Laga karepto saking Kedung, Guwosari, Pajangan, Bantul.
            Dusun Kedung meniko kalebet ing wewengkon Guwosari Kapanewon Pajangan
            Bantul Ngayogyakarta Hadiningrat ingkang tasih nguri nguri tradisi luhur
            budaya Jawi, inggih meniko kirab bregodo gunungan tetilaripun saking
            Kraton Ngayogyakarta Hadiningrat.
          </p>
          <p className="vm-text">
            Bregodo Suryeng Laga meniko kagem pralampito perang Kanjeng Sinuwun
            Pangeran Diponegoro, utawi Pangeran Haryo Selarong Gusti Pangeran
            Adinegoro wonten ing bumi Selarong. Perang Pangeran Diponegoro kasebat
            &ldquo;Perang Gerilya&rdquo; utawi perang nyawijining rakyat Selarong
            kaliyan pasukan Pangeran Diponegoro, saenggo saged ngawonaken pasukan
            Hindia Belanda (VOC) dipun damel kocar kacir sinaoso pasukan Walandi
            sampun ngginakaken taktik perang adu domba utawi Devide Et Impera. Ewo
            semanten sedoyo prajurit Walandi tinggal gelanggang colong playu tebih
            saking bumi Nuswantoro.
          </p>
          <p className="vm-text">
            Rikolo semanten wonten ing Kedung menika dipun ginakaken kagem olah
            keprajuritan pasukan berkuda Pangeran Diponegoro ingkang dipun pandegani
            Senopati Surya Laga utawi Suryeng Laga. Wondene ing Goa Selarong dipun
            ginakaken Pangeran Diponegoro kagem pesanggrahan selami mimpin Perang
            Diponegoro.
          </p>
          <p className="vm-text">
            Wandene Bregodo Suryeng Laga Dusun Kedung menika anggambaraken kerukunan
            rakyat Kedung saged nyawiji punggawa lan rakyat mbasmi Korupsi, Kolusi,
            Nepotisme saking bumi Guwosari. Kanthi menika rakyat Kedung sak iyek
            sakeko kapti jumenengaken barisan bregodo prajurit segelar sepapan kanthi
            iring-iringan asung upo karti gunungan ingkang kaimpun saking kulu wektu
            hasil bumi Kedung ingkang awujud sayur-sayuran, buah-buahan lan
            sakpiturutipun.
          </p>
          <p className="vm-text">
            Wondene kawontenan ing Dusun Kedung menika gunung, alas gung liwang
            liwung pereng, wadas lan lemah lempung. Rakyat Kedung rumaos remen saged
            ngaturaken Bregodo wonten ing Selarong menika. Kawontenan ing Dusun Kedung
            menika saged kasebat Kedung menika katitik saking mapinten-pinten sumber
            toyo, salah setunggalipun Sumur Miring. Wondene Sumur Miring meniko
            miturut salah setunggalipun abdi Pangeran Diponegoro, Sumur Miring menika
            kadadean saking tapak sikil jaran Pangeran Diponegoro.
          </p>
        </div>

        <div className="vm-card" data-aos="fade-up" data-aos-delay="300">
          <div className="vm-icon vm-icon-visi">
            <FaUsers />
          </div>
          <h3 className="vm-title">Sejarah Kepemimpinan</h3>
          <div className="vm-info-badge">Informasi segera menyusul</div>
        </div>
      </div>
    </main>
  );
}

export default Sejarah;
