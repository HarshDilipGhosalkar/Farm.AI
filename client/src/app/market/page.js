"use client";

import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import getLanguage from "@/utils/language";

const images = [
  "assets/images/slide-1.png",
  "assets/images/slide-2.png",
  "assets/images/slide-3.png",
  "assets/images/slide-4.png",
];

const Market = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  useEffect(() => {
    getLanguage().then((language) => {
      setSelectedLanguage(language);
    });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [price, setPrice] = useState("");

  const [voiceInput, setVoiceInput] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = (language) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.onstart = () => {
      setListening(true);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceInput(transcript);
      console.log(transcript);
      getRoute(transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    setPrice("loading...");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      crop_name: selectedCommodity,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://codeshashtra-allstackers.onrender.com/marketPrice",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPrice(result.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const onCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="carousel w-full h-[160px]">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`w-[100%] h-[100%] slide ${
              index === currentIndex ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ))}
      </div>
      <div className="px-[10px] pt-[15px]">
        <h1 className="text-center font-bold text-2xl">
          {selectedLanguage === "english" ? (
            <>Market Price</>
          ) : selectedLanguage === "hindi" ? (
            <>बाजार कीमत</>
          ) : selectedLanguage === "marathi" ? (
            <>बाजार किंमत</>
          ) : selectedLanguage === "gujarati" ? (
            <>બજાર ભાવ</>
          ) : selectedLanguage === "tamil" ? (
            <>சந்தை விலை </>
          ) : (
            ""
          )}
        </h1>
        <div className="flex px-[10px] justify-between mt-[20px]">
          <select
            className="w-[200px] p-[10px] border rounded-sm"
            name=""
            onClick={(e) => onCommodityChange(e)}
          >
            <option value="0">--Select--</option>
            <option value="absinthe">Absinthe</option>
            <option value="ajwan">Ajwan</option>
            <option value="alasande gram">Alasande Gram</option>
            <option value="almond(badam)">Almond(Badam)</option>
            <option value="alsandikai">Alsandikai</option>
            <option value="amaranthus">Amaranthus</option>
            <option value="ambada seed">Ambada Seed</option>
            <option value="ambady/mesta">Ambady/Mesta</option>
            <option value="amla(nelli kai)">Amla(Nelli Kai)</option>
            <option value="amphophalus">Amphophalus</option>
            <option value="amranthas red">Amranthas Red</option>
            <option value="antawala">Antawala</option>
            <option value="anthorium">Anthorium</option>
            <option value="apple">Apple</option>
            <option value="apricot(jardalu/khumani)">
              Apricot(Jardalu/Khumani)
            </option>
            <option value="arecanut(betelnut/supari)">
              Arecanut(Betelnut/Supari)
            </option>
            <option value="arhar (tur/red gram)(whole)">
              Arhar (Tur/Red Gram)(Whole)
            </option>
            <option value="arhar dal(tur dal)">Arhar Dal(Tur Dal)</option>
            <option value="asalia">Asalia</option>
            <option value="ashgourd">Ashgourd</option>
            <option value="ashwagandha">Ashwagandha</option>
            <option value="asparagus">Asparagus</option>
            <option value="astera">Astera</option>
            <option value="avare dal">Avare Dal</option>
            <option value="bael">Bael</option>
            <option value="bajra(pearl millet/cumbu)">
              Bajra(Pearl Millet/Cumbu)
            </option>
            <option value="balekai">Balekai</option>
            <option value="balsam">balsam</option>
            <option value="bamboo">Bamboo</option>
            <option value="banana">Banana</option>
            <option value="banana - green">Banana - Green</option>
            <option value="barley (jau)">Barley (Jau)</option>
            <option value="basil">basil</option>
            <option value="bay leaf (tejpatta)">Bay leaf (Tejpatta)</option>
            <option value="beans">Beans</option>
            <option value="beaten rice">Beaten Rice</option>
            <option value="beetroot">Beetroot</option>
            <option value="bengal gram dal (chana dal)">
              Bengal Gram Dal (Chana Dal)
            </option>
            <option value="bengal gram(gram)(whole)">
              Bengal Gram(Gram)(Whole)
            </option>
            <option value="ber(zizyphus/borehannu)">
              Ber(Zizyphus/Borehannu)
            </option>
            <option value="betal leaves">Betal Leaves</option>
            <option value="betelnuts">Betelnuts</option>
            <option value="bhindi(ladies finger)">Bhindi(Ladies Finger)</option>
            <option value="bhui amlaya">Bhui Amlaya</option>
            <option value="big gram">Big Gram</option>
            <option value="binoula">Binoula</option>
            <option value="bitter gourd">Bitter gourd</option>
            <option value="black gram (urd beans)(whole)">
              Black Gram (Urd Beans)(Whole)
            </option>
            <option value="black gram dal (urd dal)">
              Black Gram Dal (Urd Dal)
            </option>
            <option value="black pepper">Black pepper</option>
            <option value="bop">BOP</option>
            <option value="borehannu">Borehannu</option>
            <option value="bottle gourd">Bottle gourd</option>
            <option value="brahmi">Brahmi</option>
            <option value="bran">Bran</option>
            <option value="brinjal">Brinjal</option>
            <option value="broken rice">Broken Rice</option>
            <option value="broomstick(flower broom)">
              Broomstick(Flower Broom)
            </option>
            <option value="bull">Bull</option>
            <option value="bullar">Bullar</option>
            <option value="bunch beans">Bunch Beans</option>
            <option value="butter">Butter</option>
            <option value="buttery">buttery</option>
            <option value="cabbage">Cabbage</option>
            <option value="calendula">Calendula</option>
            <option value="calf">Calf</option>
            <option value="camel hair">Camel Hair</option>
            <option value="cane">Cane</option>
            <option value="capsicum">Capsicum</option>
            <option value="cardamoms">Cardamoms</option>
            <option value="carnation">Carnation</option>
            <option value="carrot">Carrot</option>
            <option value="cashew kernnel">Cashew Kernnel</option>
            <option value="cashewnuts">Cashewnuts</option>
            <option value="castor oil">Castor Oil</option>
            <option value="castor seed">Castor Seed</option>
            <option value="cauliflower">Cauliflower</option>
            <option value="chakotha">Chakotha</option>
            <option value="chandrashoor">Chandrashoor</option>
            <option value="chapparad avare">Chapparad Avare</option>
            <option value="chennangi (whole)">Chennangi (Whole)</option>
            <option value="chennangi dal">Chennangi Dal</option>
            <option value="cherry">Cherry</option>
            <option value="chikoos(sapota)">Chikoos(Sapota)</option>
            <option value="chili red">Chili Red</option>
            <option value="chilly capsicum">Chilly Capsicum</option>
            <option value="chow chow">Chow Chow</option>
            <option value="chrysanthemum">Chrysanthemum</option>
            <option value="chrysanthemum(loose)">Chrysanthemum(Loose)</option>
            <option value="cinamon(dalchini)">Cinamon(Dalchini)</option>
            <option value="cineraria">cineraria</option>
            <option value="clarkia">Clarkia</option>
            <option value="cloves">Cloves</option>
            <option value="cluster beans">Cluster beans</option>
            <option value="coca">Coca</option>
            <option value="cock">Cock</option>
            <option value="cocoa">Cocoa</option>
            <option value="coconut">Coconut</option>
            <option value="coconut oil">Coconut Oil</option>
            <option value="coconut seed">Coconut Seed</option>
            <option value="coffee">Coffee</option>
            <option value="colacasia">Colacasia</option>
            <option value="copra">Copra</option>
            <option value="coriander(leaves)">Coriander(Leaves)</option>
            <option value="corriander seed">Corriander seed</option>
            <option value="cossandra">Cossandra</option>
            <option value="cotton">Cotton</option>
            <option value="cotton seed">Cotton Seed</option>
            <option value="cow">Cow</option>
            <option value="cowpea (lobia/karamani)">
              Cowpea (Lobia/Karamani)
            </option>
            <option value="cowpea(veg)">Cowpea(Veg)</option>
            <option value="cucumbar(kheera)">Cucumbar(Kheera)</option>
            <option value="cummin seed(jeera)">Cummin Seed(Jeera)</option>
            <option value="custard apple (sharifa)">
              Custard Apple (Sharifa)
            </option>
            <option value="daila(chandni)">Daila(Chandni)</option>
            <option value="dal (avare)">Dal (Avare)</option>
            <option value="dalda">Dalda</option>
            <option value="delha">Delha</option>
            <option value="dhaincha">Dhaincha</option>
            <option value="dhawai flowers">dhawai flowers</option>
            <option value="dianthus">dianthus</option>
            <option value="dried mango">dried mango</option>
            <option value="drumstick">Drumstick</option>
            <option value="dry chillies">Dry Chillies</option>
            <option value="dry fodder">Dry Fodder</option>
            <option value="dry grapes">Dry Grapes</option>
            <option value="duck">Duck</option>
            <option value="duster beans">Duster Beans</option>
            <option value="egg">Egg</option>
            <option value="egypian clover(barseem)">
              Egypian Clover(Barseem)
            </option>
            <option value="elephant yam (suran)">Elephant Yam (Suran)</option>
            <option value="field pea">Field Pea</option>
            <option value="fig(anjura/anjeer)">Fig(Anjura/Anjeer)</option>
            <option value="firewood">Firewood</option>
            <option value="fish">Fish</option>
            <option value="flower broom">Flower Broom</option>
            <option value="foxtail millet(navane)">
              Foxtail Millet(Navane)
            </option>
            <option value="french beans (frasbean)">
              French Beans (Frasbean)
            </option>
            <option value="galgal(lemon)">Galgal(Lemon)</option>
            <option value="gamphrena">Gamphrena</option>
            <option value="garlic">Garlic</option>
            <option value="ghee">Ghee</option>
            <option value="giloy">Giloy</option>
            <option value="gingelly oil">Gingelly Oil</option>
            <option value="ginger(dry)">Ginger(Dry)</option>
            <option value="ginger(green)">Ginger(Green)</option>
            <option value="gladiolus bulb">Gladiolus Bulb</option>
            <option value="gladiolus cut flower">Gladiolus Cut Flower</option>
            <option value="glardia">Glardia</option>
            <option value="goat">Goat</option>
            <option value="goat hair">Goat Hair</option>
            <option value="golden rod">Golden Rod</option>
            <option value="gram raw(chholia)">Gram Raw(Chholia)</option>
            <option value="gramflour">Gramflour</option>
            <option value="grapes">Grapes</option>
            <option value="green avare (w)">Green Avare (W)</option>
            <option value="green chilli">Green Chilli</option>
            <option value="green fodder">Green Fodder</option>
            <option value="green gram (moong)(whole)">
              Green Gram (Moong)(Whole)
            </option>
            <option value="green gram dal (moong dal)">
              Green Gram Dal (Moong Dal)
            </option>
            <option value="green peas">Green Peas</option>
            <option value="ground nut oil">Ground Nut Oil</option>
            <option value="ground nut seed">Ground Nut Seed</option>
            <option value="groundnut">Groundnut</option>
            <option value="groundnut (split)">Groundnut (Split)</option>
            <option value="groundnut pods (raw)">Groundnut pods (raw)</option>
            <option value="guar">Guar</option>
            <option value="guar seed(cluster beans seed)">
              Guar Seed(Cluster Beans Seed)
            </option>
            <option value="guava">Guava</option>
            <option value="gudmar">Gudmar</option>
            <option value="guggal">Guggal</option>
            <option value="gulli">Gulli</option>
            <option value="gur(jaggery)">Gur(Jaggery)</option>
            <option value="gurellu">Gurellu</option>
            <option value="gypsophila">Gypsophila</option>
            <option value="haralekai">Haralekai</option>
            <option value="he buffalo">He Buffalo</option>
            <option value="heliconia species">Heliconia Species</option>
            <option value="hen">Hen</option>
            <option value="hippe seed">Hippe Seed</option>
            <option value="honey">Honey</option>
            <option value="honge seed">Honge Seed</option>
            <option value="hybrid cumbu">Hybrid Cumbu</option>
            <option value="hydrangea">Hydrangea</option>
            <option value="indian beans (seam)">Indian Beans (Seam)</option>
            <option value="indian colza(sarson)">Indian Colza(Sarson)</option>
            <option value="irish">Irish</option>
            <option value="isabgul (psyllium)">Isabgul (Psyllium)</option>
            <option value="jack fruit">Jack Fruit</option>
            <option value="jaffri">Jaffri</option>
            <option value="jaggery">Jaggery</option>
            <option value="jamamkhan">Jamamkhan</option>
            <option value="jamun(narale hannu)">Jamun(Narale Hannu)</option>
            <option value="jarbara">Jarbara</option>
            <option value="jasmine">Jasmine</option>
            <option value="javi">Javi</option>
            <option value="jowar(sorghum)">Jowar(Sorghum)</option>
            <option value="jute">Jute</option>
            <option value="jute seed">Jute Seed</option>
            <option value="kabuli chana(chickpeas-white)">
              Kabuli Chana(Chickpeas-White)
            </option>
            <option value="kacholam">Kacholam</option>
            <option value="kakada">Kakada</option>
            <option value="kalihari">Kalihari</option>
            <option value="kalmegh">Kalmegh</option>
            <option value="kankambra">Kankambra</option>
            <option value="karamani">Karamani</option>
            <option value="karanja seeds">Karanja Seeds</option>
            <option value="karbuja(musk melon)">Karbuja(Musk Melon)</option>
            <option value="kartali (kantola)">Kartali (Kantola)</option>
            <option value="kevda">Kevda</option>
            <option value="kharif mash">Kharif Mash</option>
            <option value="khoya">Khoya</option>
            <option value="kinnow">Kinnow</option>
            <option value="knool khol">Knool Khol</option>
            <option value="kodo millet(varagu)">Kodo Millet(Varagu)</option>
            <option value="kokum">Kokum</option>
            <option value="kooth">Kooth</option>
            <option value="kuchur">Kuchur</option>
            <option value="kulthi(horse gram)">Kulthi(Horse Gram)</option>
            <option value="kutki">Kutki</option>
            <option value="kutki">Kutki</option>
            <option value="ladies finger">Ladies Finger</option>
            <option value="lak(teora)">Lak(Teora)</option>
            <option value="leafy vegetable">Leafy Vegetable</option>
            <option value="lemon">Lemon</option>
            <option value="lentil (masur)(whole)">Lentil (Masur)(Whole)</option>
            <option value="lilly">Lilly</option>
            <option value="lime">Lime</option>
            <option value="limonia (status)">Limonia (Status)</option>
            <option value="linseed">Linseed</option>
            <option value="lint">Lint</option>
            <option value="liquor turmeric">Liquor Turmeric</option>
            <option value="litchi">Litchi</option>
            <option value="little gourd (kundru)">Little Gourd (Kundru)</option>
            <option value="long melon(kakri)">Long Melon(Kakri)</option>
            <option value="lotus">Lotus</option>
            <option value="lotus sticks">Lotus Sticks</option>
            <option value="lukad">Lukad</option>
            <option value="lupine">Lupine</option>
            <option value="mace">Mace</option>
            <option value="macoy">Macoy</option>
            <option value="mahedi">Mahedi</option>
            <option value="mahua">Mahua</option>
            <option value="mahua seed(hippe seed)">
              Mahua Seed(Hippe Seed)
            </option>
            <option value="maida atta">Maida Atta</option>
            <option value="maize">Maize</option>
            <option value="mango">Mango</option>
            <option value="mango (raw-ripe)">Mango (Raw-Ripe)</option>
            <option value="mango powder">Mango Powder</option>
            <option value="maragensu">Maragensu</option>
            <option value="marasebu">Marasebu</option>
            <option value="marget">Marget</option>
            <option value="marigold(calcutta)">Marigold(Calcutta)</option>
            <option value="marigold(loose)">Marigold(Loose)</option>
            <option value="mash">Mash</option>
            <option value="mashrooms">Mashrooms</option>
            <option value="masur dal">Masur Dal</option>
            <option value="mataki">Mataki</option>
            <option value="methi seeds">Methi Seeds</option>
            <option value="methi(leaves)">Methi(Leaves)</option>
            <option value="millets">Millets</option>
            <option value="mint(pudina)">Mint(Pudina)</option>
            <option value="moath dal">Moath Dal</option>
            <option value="moath dal">Moath Dal</option>
            <option value="mousambi(sweet lime)">Mousambi(Sweet Lime)</option>
            <option value="muesli">Muesli</option>
            <option value="muleti">Muleti</option>
            <option value="mustard">Mustard</option>
            <option value="mustard oil">Mustard Oil</option>
            <option value="myrobolan(harad)">Myrobolan(Harad)</option>
            <option value="nargasi">Nargasi</option>
            <option value="nearle hannu">Nearle Hannu</option>
            <option value="neem seed">Neem Seed</option>
            <option value="nelli kai">Nelli Kai</option>
            <option value="nigella seeds">Nigella Seeds</option>
            <option value="nigella seeds">Nigella Seeds</option>
            <option value="niger seed (ramtil)">Niger Seed (Ramtil)</option>
            <option value="nutmeg">Nutmeg</option>
            <option value="onion">Onion</option>
            <option value="onion green">Onion Green</option>
            <option value="orange">Orange</option>
            <option value="orchid">Orchid</option>
            <option value="other green and fresh vegetables">
              Other Green and Fresh Vegetables
            </option>
            <option value="other pulses">Other Pulses</option>
            <option value="ox">Ox</option>
            <option value="paddy(dhan)(basmati)">Paddy(Dhan)(Basmati)</option>
            <option value="paddy(dhan)(common)">Paddy(Dhan)(Common)</option>
            <option value="palash flowers">Palash Flowers</option>
            <option value="papaya">Papaya</option>
            <option value="papaya (raw)">Papaya (Raw)</option>
            <option value="patti calcutta">Patti Calcutta</option>
            <option value="peach">Peach</option>
            <option value="pear(marasebu)">Pear(Marasebu)</option>
            <option value="peas cod">Peas Cod</option>
            <option value="peas wet">Peas Wet</option>
            <option value="peas(dry)">Peas(Dry)</option>
            <option value="pegeon pea (arhar fali)">
              Pegeon Pea (Arhar Fali)
            </option>
            <option value="pepper garbled">Pepper Garbled</option>
            <option value="pepper ungarbled">Pepper Ungarbled</option>
            <option value="persimon(japani fal)">Persimon(Japani Fal)</option>
            <option value="pigs">Pigs</option>
            <option value="pineapple">Pineapple</option>
            <option value="pippali">Pippali</option>
            <option value="plum">Plum</option>
            <option value="pointed gourd (parval)">
              Pointed Gourd (Parval)
            </option>
            <option value="polherb">Polherb</option>
            <option value="pomegranate">Pomegranate</option>
            <option value="poppy capsules">Poppy Capsules</option>
            <option value="poppy seeds">Poppy Seeds</option>
            <option value="potato">Potato</option>
            <option value="pumpkin">Pumpkin</option>
            <option value="pundi">Pundi</option>
            <option value="pundi seed">Pundi Seed</option>
            <option value="pupadia">Pupadia</option>
            <option value="raddish">Raddish</option>
            <option value="ragi (finger millet)">Ragi (Finger Millet)</option>
            <option value="raibel">Raibel</option>
            <option value="rajgir">Rajgir</option>
            <option value="ram">Ram</option>
            <option value="rat tail radish (mogari)">
              Rat Tail Radish (Mogari)
            </option>
            <option value="ratanjot">Ratanjot</option>
            <option value="raya">Raya</option>
            <option value="red gram">Red Gram</option>
            <option value="resinwood">Resinwood</option>
            <option value="riccbcan">Riccbcan</option>
            <option value="rice">Rice</option>
            <option value="ridgeguard(tori)">Ridgeguard(Tori)</option>
            <option value="rose(local)">Rose(Local)</option>
            <option value="rose(loose))">Rose(Loose))</option>
            <option value="rose(tata)">Rose(Tata)</option>
            <option value="round gourd">Round Gourd</option>
            <option value="rubber">Rubber</option>
            <option value="sabu dan">Sabu Dan</option>
            <option value="safflower">Safflower</option>
            <option value="saffron">Saffron</option>
            <option value="sajje">Sajje</option>
            <option value="salvia">Salvia</option>
            <option value="same/savi">Same/Savi</option>
            <option value="sanay">Sanay</option>
            <option value="sandalwood">Sandalwood</option>
            <option value="sarasum">Sarasum</option>
            <option value="season leaves">Season Leaves</option>
            <option value="seegu">Seegu</option>
            <option value="seemebadnekai">Seemebadnekai</option>
            <option value="seetapal">Seetapal</option>
            <option value="sesamum(sesame,gingelly,til)">
              Sesamum(Sesame,Gingelly,Til)
            </option>
            <option value="sevanti">Sevanti</option>
            <option value="she buffalo">She Buffalo</option>
            <option value="she goat">She Goat</option>
            <option value="sheep">Sheep</option>
            <option value="siddota">Siddota</option>
            <option value="skin and hide">Skin And Hide</option>
            <option value="snakeguard">Snakeguard</option>
            <option value="soanf">Soanf</option>
            <option value="soapnut(antawala/retha)">
              Soapnut(Antawala/Retha)
            </option>
            <option value="soji">Soji</option>
            <option value="sompu">Sompu</option>
            <option value="soyabean">Soyabean</option>
            <option value="spikenard">Spikenard</option>
            <option value="spinach">Spinach</option>
            <option value="sponge gourd">Sponge Gourd</option>
            <option value="squash(chappal kadoo)">Squash(Chappal Kadoo)</option>
            <option value="stevia">Stevia</option>
            <option value="stone pulverizer">Stone Pulverizer</option>
            <option value="sugar">Sugar</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="sunflower">Sunflower</option>
            <option value="sunflower seed">Sunflower Seed</option>
            <option value="sunhemp">Sunhemp</option>
            <option value="suram">Suram</option>
            <option value="surat beans (papadi)">Surat Beans (Papadi)</option>
            <option value="suva (dill seed)">Suva (Dill Seed)</option>
            <option value="suvarna gadde">Suvarna Gadde</option>
            <option value="sweet potato">Sweet Potato</option>
            <option value="sweet pumpkin">Sweet Pumpkin</option>
            <option value="sweet sultan">Sweet Sultan</option>
            <option value="sweet william">Sweet William</option>
            <option value="t.v. cumbu">T.V. Cumbu</option>
            <option value="tamarind fruit">Tamarind Fruit</option>
            <option value="tamarind seed">Tamarind Seed</option>
            <option value="tapioca">Tapioca</option>
            <option value="taramira">Taramira</option>
            <option value="tea">Tea</option>
            <option value="tender coconut">Tender Coconut</option>
            <option value="thinai (italian millet)">
              Thinai (Italian Millet)
            </option>
            <option value="thogrikai">Thogrikai</option>
            <option value="thondekai">Thondekai</option>
            <option value="tinda">Tinda</option>
            <option value="tobacco">Tobacco</option>
            <option value="tomato">Tomato</option>
            <option value="torchwood">Torchwood</option>
            <option value="toria">Toria</option>
            <option value="tube flower">Tube Flower</option>
            <option value="tube rose(double)">Tube Rose(Double)</option>
            <option value="tube rose(loose)">Tube Rose(Loose)</option>
            <option value="tube rose(single)">Tube Rose(Single)</option>
            <option value="tulip">Tulip</option>
            <option value="turmeric">Turmeric</option>
            <option value="turmeric (raw)">Turmeric (raw)</option>
            <option value="turnip">Turnip</option>
            <option value="vadang">Vadang</option>
            <option value="vatsanabha">Vatsanabha</option>
            <option value="walnut">Walnut</option>
            <option value="water melon">Water Melon</option>
            <option value="wheat">Wheat</option>
            <option value="wheat atta">Wheat Atta</option>
            <option value="white muesli">White Muesli</option>
            <option value="white peas">White Peas</option>
            <option value="white pumpkin">White Pumpkin</option>
            <option value="wood">Wood</option>
            <option value="wool">Wool</option>
            <option value="yam">Yam</option>
            <option value="yam (ratalu)">Yam (Ratalu)</option>
          </select>
          {!loading ? (
            <button
              className="rounded-[10px] bg-blue-500 px-[20px] text-white"
              onClick={handleSubmit}
            >
              {selectedLanguage === "english" ? (
                <>Get Price</>
              ) : selectedLanguage === "hindi" ? (
                <>मूल्य प्राप्त करें</>
              ) : selectedLanguage === "marathi" ? (
                <>दर मिळवा</>
              ) : selectedLanguage === "gujarati" ? (
                <>મૂલ્ય મેળવો</>
              ) : selectedLanguage === "tamil" ? (
                <>விலையை பெறுங்கள்</>
              ) : (
                ""
              )}
            </button>
          ) : (
            <>
              <ScaleLoader />
            </>
          )}
        </div>
        {price && (
          <div class="container mx-auto mt-[80px] px-[10px]">
            <div class="grid grid-cols-2 gap-4">
              <div class="col">
                <div class="border border-gray-400 rounded-lg p-[10px]">
                  <div class="font-semibold">
                    {selectedLanguage === "english" ? (
                      <>Commodity</>
                    ) : selectedLanguage === "hindi" ? (
                      <>वस्त्र</>
                    ) : selectedLanguage === "marathi" ? (
                      <>खाद्य पदार्थ</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>ખેતીના આઇટમ્સ</>
                    ) : selectedLanguage === "tamil" ? (
                      <>உணவு பொருட்கள்</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="">{selectedCommodity}</div>
                </div>
              </div>
              <div class="col">
                <div class="border border-gray-400 rounded-lg p-[10px]">
                  <div class="font-semibold">
                    {selectedLanguage === "english" ? (
                      <>State</>
                    ) : selectedLanguage === "hindi" ? (
                      <>राज्य</>
                    ) : selectedLanguage === "marathi" ? (
                      <>राज्य</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>રાજ્ય</>
                    ) : selectedLanguage === "tamil" ? (
                      <>மாநிலம்</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="">
                    {selectedLanguage === "english" ? (
                      <>Maharastra</>
                    ) : selectedLanguage === "hindi" ? (
                      <>महाराष्ट्र</>
                    ) : selectedLanguage === "marathi" ? (
                      <>महाराष्ट्र</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>મહારાષ્ટ્ર</>
                    ) : selectedLanguage === "tamil" ? (
                      <>மஹாராஷ்டிரா</>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="border border-gray-400 rounded-lg p-[10px]">
                  <div class="font-semibold">
                    {selectedLanguage === "english" ? (
                      <>District</>
                    ) : selectedLanguage === "hindi" ? (
                      <>जिला</>
                    ) : selectedLanguage === "marathi" ? (
                      <>जिल्हा</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>જિલ્લો</>
                    ) : selectedLanguage === "tamil" ? (
                      <>மாவட்டம்</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="">
                    {selectedLanguage === "english" ? (
                      <>Mumbai</>
                    ) : selectedLanguage === "hindi" ? (
                      <>मुंबई</>
                    ) : selectedLanguage === "marathi" ? (
                      <>मुंबई</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>મુંબઈ</>
                    ) : selectedLanguage === "tamil" ? (
                      <>மும்பை</>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="border border-gray-400 rounded-lg p-[10px]">
                  <div class="font-semibold">
                    {selectedLanguage === "english" ? (
                      <>Market</>
                    ) : selectedLanguage === "hindi" ? (
                      <>बाजार</>
                    ) : selectedLanguage === "marathi" ? (
                      <>बाजार</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>બજાર</>
                    ) : selectedLanguage === "tamil" ? (
                      <>சந்தை</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="">
                    {selectedLanguage === "english" ? (
                      <>Thane</>
                    ) : selectedLanguage === "hindi" ? (
                      <>ठाणे</>
                    ) : selectedLanguage === "marathi" ? (
                      <>ठाणे</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>ઠાણે</>
                    ) : selectedLanguage === "tamil" ? (
                      <>தானே</>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 mt-4 gap-4">
              <div class="col">
                <div class="border border-gray-400 rounded-lg p-[10px]">
                  <div class="font-semibold">
                    {selectedLanguage === "english" ? (
                      <>Price</>
                    ) : selectedLanguage === "hindi" ? (
                      <>कीमत</>
                    ) : selectedLanguage === "marathi" ? (
                      <>किंमत</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>કિંમત</>
                    ) : selectedLanguage === "tamil" ? (
                      <>விலை</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="">{price}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <>
        {voiceInput.length > 3 && (
          <div className="fixed bottom-[80px] w-full px-[20px] py-[10px] pb-[25px]">
            <div className="px-[20px] py-[10px] border w-full bg-gray-100 rounded-[10px] text-black">
              {voiceInput}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 w-full bg-white border shadow-lg bottom-navbar">
          <div className="flex justify-around gap-x-[5px] px-[30px] py-[10px] text-gray-400">
            <div
              className={`flex flex-col items-center hover:text-green-400 `}
              onClick={() => router.push("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-[35px] h-[35px]"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              {selectedLanguage === "english" ? (
                <>Home</>
              ) : selectedLanguage === "hindi" ? (
                <>होम</>
              ) : selectedLanguage === "marathi" ? (
                <>होम</>
              ) : selectedLanguage === "gujarati" ? (
                <>હોમ</>
              ) : selectedLanguage === "tamil" ? (
                <>ஹோம்</>
              ) : (
                ""
              )}
            </div>
            <div
              className={`flex items-center justify-center ${
                listening ? "bg-green-400" : "bg-blue-400"
              }  mt-[-30px] h-[80px] w-[80px] rounded-[50%] text-white`}
              onClick={() => startListening("en-US")}
            >
              {!listening ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-[35px] h-[35px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              ) : (
                <ScaleLoader color="#ffffff" />
              )}
            </div>
            <div className="flex flex-col items-center hover:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-[35px] h-[35px]"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clip-rule="evenodd"
                />
              </svg>
              {selectedLanguage === "english" ? (
                <>Profile</>
              ) : selectedLanguage === "hindi" ? (
                <>प्रोफाइल</>
              ) : selectedLanguage === "marathi" ? (
                <>प्रोफाईल</>
              ) : selectedLanguage === "gujarati" ? (
                <>પ્રોફાઈલ</>
              ) : selectedLanguage === "tamil" ? (
                <>ப்ரோஃபைல்</>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Market;
