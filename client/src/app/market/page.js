"use client";

import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

const images = [
  "assets/images/slide-1.png",
  "assets/images/slide-2.png",
  "assets/images/slide-3.png",
  "assets/images/slide-4.png",
];

const Market = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState("Rice");
  const [price, setPrice] = useState("Rs. 4000");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const handleSubmit = () => {
    setLoading(true);
  };

  const onCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
    setPrice("loading...")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "crop_name": "soya bean"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:5000/marketPrice", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSelectedCommodity(e.target.value);
        setPrice(result.price);
      })
      .catch((error) => console.error(error));
      }
  

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
        <h1 className="text-center font-bold text-2xl">Market Price</h1>
        <div className="flex px-[10px] justify-between mt-[20px]">
          <select className="w-[200px] p-[10px] border rounded-sm" name="" onClick={(e) => onCommodityChange(e)}>
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
            <option value="apricot(jardalu/khumani)">Apricot(Jardalu/Khumani)</option>
            <option value="arecanut(betelnut/supari)">Arecanut(Betelnut/Supari)</option>
            <option value="arhar (tur/red gram)(whole)">Arhar (Tur/Red Gram)(Whole)</option>
            <option value="arhar dal(tur dal)">Arhar Dal(Tur Dal)</option>
            <option value="asalia">Asalia</option>
            <option value="ashgourd">Ashgourd</option>
            <option value="ashwagandha">Ashwagandha</option>
            <option value="asparagus">Asparagus</option>
            <option value="astera">Astera</option>
            <option value="avare dal">Avare Dal</option>
            <option value="bael">Bael</option>
            <option value="bajra(pearl millet/cumbu)">Bajra(Pearl Millet/Cumbu)</option>
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
            <option value="bengal gram dal (chana dal)">Bengal Gram Dal (Chana Dal)</option>
            <option value="bengal gram(gram)(whole)">Bengal Gram(Gram)(Whole)</option>
            <option value="ber(zizyphus/borehannu)">Ber(Zizyphus/Borehannu)</option>
            <option value="betal leaves">Betal Leaves</option>
            <option value="betelnuts">Betelnuts</option>
            <option value="bhindi(ladies finger)">Bhindi(Ladies Finger)</option>
            <option value="bhui amlaya">Bhui Amlaya</option>
            <option value="big gram">Big Gram</option>
            <option value="binoula">Binoula</option>
            <option value="bitter gourd">Bitter gourd</option>
            <option value="black gram (urd beans)(whole)">Black Gram (Urd Beans)(Whole)</option>
            <option value="black gram dal (urd dal)">Black Gram Dal (Urd Dal)</option>
            <option value="black pepper">Black pepper</option>
            <option value="bop">BOP</option>
            <option value="borehannu">Borehannu</option>
            <option value="bottle gourd">Bottle gourd</option>
            <option value="brahmi">Brahmi</option>
            <option value="bran">Bran</option>
            <option value="brinjal">Brinjal</option>
            <option value="broken rice">Broken Rice</option>
            <option value="broomstick(flower broom)">Broomstick(Flower Broom)</option>
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
            <option value="cowpea (lobia/karamani)">Cowpea (Lobia/Karamani)</option>
            <option value="cowpea(veg)">Cowpea(Veg)</option>
            <option value="cucumbar(kheera)">Cucumbar(Kheera)</option>
            <option value="cummin seed(jeera)">Cummin Seed(Jeera)</option>
            <option value="custard apple (sharifa)">Custard Apple (Sharifa)</option>
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
            <option value="361">Egypian Clover(Barseem)</option>
            <option value="296">Elephant Yam (Suran)</option>
            <option value="64">Field Pea</option>
            <option value="221">Fig(Anjura/Anjeer)</option>
            <option value="206">Firewood</option>
            <option value="366">Fish</option>
            <option value="365">Flower Broom</option>
            <option value="121">Foxtail Millet(Navane)</option>
            <option value="298">French Beans (Frasbean)</option>
            <option value="350">Galgal(Lemon)</option>
            <option value="471">Gamphrena</option>
            <option value="25">Garlic</option>
            <option value="249">Ghee</option>
            <option value="452">Giloy</option>
            <option value="276">Gingelly Oil</option>
            <option value="27">Ginger(Dry)</option>
            <option value="103">Ginger(Green)</option>
            <option value="364">Gladiolus Bulb</option>
            <option value="363">Gladiolus Cut Flower</option>
            <option value="462">Glardia</option>
            <option value="219">Goat</option>
            <option value="353">Goat Hair</option>
            <option value="475">golden rod</option>
            <option value="359">Gram Raw(Chholia)</option>
            <option value="294">Gramflour</option>
            <option value="22">Grapes</option>
            <option value="165">Green Avare (W)</option>
            <option value="87">Green Chilli</option>
            <option value="346">Green Fodder</option>
            <option value="9">Green Gram (Moong)(Whole)</option>
            <option value="265">Green Gram Dal (Moong Dal)</option>
            <option value="50">Green Peas</option>
            <option value="267">Ground Nut Oil</option>
            <option value="268">Ground Nut Seed</option>
            <option value="10">Groundnut</option>
            <option value="314">Groundnut (Split)</option>
            <option value="312">Groundnut pods (raw)</option>
            <option value="75">Guar</option>
            <option value="413">Guar Seed(Cluster Beans Seed)</option>
            <option value="185">Guava</option>
            <option value="453">Gudmar</option>
            <option value="454">Guggal</option>
            <option value="461">gulli</option>
            <option value="74">Gur(Jaggery)</option>
            <option value="279">Gurellu</option>
            <option value="469">gypsophila</option>
            <option value="252">Haralekai</option>
            <option value="216">He Buffalo</option>
            <option value="474">Heliconia species</option>
            <option value="369">Hen</option>
            <option value="125">Hippe Seed</option>
            <option value="236">Honey</option>
            <option value="124">Honge seed</option>
            <option value="119">Hybrid Cumbu</option>
            <option value="473">hydrangea</option>
            <option value="299">Indian Beans (Seam)</option>
            <option value="344">Indian Colza(Sarson)</option>
            <option value="465">Irish</option>
            <option value="256">Isabgul (Psyllium)</option>
            <option value="182">Jack Fruit</option>
            <option value="406">Jaffri</option>
            <option value="151">Jaggery</option>
            <option value="175">Jamamkhan</option>
            <option value="184">Jamun(Narale Hannu)</option>
            <option value="376">Jarbara</option>
            <option value="229">Jasmine</option>
            <option value="250">Javi</option>
            <option value="5">Jowar(Sorghum)</option>
            <option value="16">Jute</option>
            <option value="210">Jute Seed</option>
            <option value="362">Kabuli Chana(Chickpeas-White)</option>
            <option value="317">Kacholam</option>
            <option value="230">Kakada</option>
            <option value="456">Kalihari</option>
            <option value="457">Kalmegh</option>
            <option value="233">Kankambra</option>
            <option value="115">Karamani</option>
            <option value="439">karanja seeds</option>
            <option value="187">Karbuja(Musk Melon)</option>
            <option value="305">Kartali (Kantola)</option>
            <option value="481">Kevda</option>
            <option value="61">Kharif Mash</option>
            <option value="372">Khoya</option>
            <option value="336">Kinnow</option>
            <option value="177">Knool Khol</option>
            <option value="117">Kodo Millet(Varagu)</option>
            <option value="458">kokum</option>
            <option value="459">Kooth</option>
            <option value="243">Kuchur</option>
            <option value="114">Kulthi(Horse Gram)</option>
            <option value="415">Kutki</option>
            <option value="426">kutki</option>
            <option value="155">Ladies Finger</option>
            <option value="96">Lak(Teora)</option>
            <option value="171">Leafy Vegetable</option>
            <option value="310">Lemon</option>
            <option value="63">Lentil (Masur)(Whole)</option>
            <option value="378">Lilly</option>
            <option value="180">Lime</option>
            <option value="470">Limonia (status)</option>
            <option value="67">Linseed</option>
            <option value="280">Lint</option>
            <option value="432">liquor turmeric</option>
            <option value="351">Litchi</option>
            <option value="302">Little gourd (Kundru)</option>
            <option value="304">Long Melon(Kakri)</option>
            <option value="403">Lotus</option>
            <option value="339">Lotus Sticks</option>
            <option value="337">Lukad</option>
            <option value="479">Lupine</option>
            <option value="107">Mace</option>
            <option value="427">macoy</option>
            <option value="411">Mahedi</option>
            <option value="335">Mahua</option>
            <option value="371">Mahua Seed(Hippe seed)</option>
            <option value="288">Maida Atta</option>
            <option value="4">Maize</option>
            <option value="20">Mango</option>
            <option value="172">Mango (Raw-Ripe)</option>
            <option value="422">mango powder</option>
            <option value="225">Maragensu</option>
            <option value="181">Marasebu</option>
            <option value="407">Marget</option>
            <option value="235">Marigold(Calcutta)</option>
            <option value="405">Marigold(loose)</option>
            <option value="60">Mash</option>
            <option value="340">Mashrooms</option>
            <option value="259">Masur Dal</option>
            <option value="93">Mataki</option>
            <option value="47">Methi Seeds</option>
            <option value="46">Methi(Leaves)</option>
            <option value="237">Millets</option>
            <option value="360">Mint(Pudina)</option>
            <option value="258">Moath Dal</option>
            <option value="95">Moath Dal</option>
            <option value="77">Mousambi(Sweet Lime)</option>
            <option value="446">Muesli</option>
            <option value="428">Muleti</option>
            <option value="12">Mustard</option>
            <option value="324">Mustard Oil</option>
            <option value="142">Myrobolan(Harad)</option>
            <option value="245">Nargasi</option>
            <option value="222">Nearle Hannu</option>
            <option value="126">Neem Seed</option>
            <option value="223">Nelli Kai</option>
            <option value="424">nigella seeds</option>
            <option value="445">nigella seeds</option>
            <option value="98">Niger Seed (Ramtil)</option>
            <option value="106">Nutmeg</option>
            <option value="23">Onion</option>
            <option value="358">Onion Green</option>
            <option value="18">Orange</option>
            <option value="381">Orchid</option>
            <option value="420">Other green and fresh vegetables</option>
            <option value="97">Other Pulses</option>
            <option value="213">Ox</option>
            <option value="414">Paddy(Dhan)(Basmati)</option>
            <option value="2">Paddy(Dhan)(Common)</option>
            <option value="441">Palash flowers</option>
            <option value="72">Papaya</option>
            <option value="313">Papaya (Raw)</option>
            <option value="404">Patti Calcutta</option>
            <option value="331">Peach</option>
            <option value="330">Pear(Marasebu)</option>
            <option value="308">Peas cod</option>
            <option value="174">Peas Wet</option>
            <option value="347">Peas(Dry)</option>
            <option value="301">Pegeon Pea (Arhar Fali)</option>
            <option value="109">Pepper garbled</option>
            <option value="110">Pepper ungarbled</option>
            <option value="327">Persimon(Japani Fal)</option>
            <option value="220">Pigs</option>
            <option value="21">Pineapple</option>
            <option value="431">pippali</option>
            <option value="329">Plum</option>
            <option value="303">Pointed gourd (Parval)</option>
            <option value="240">Polherb</option>
            <option value="190">Pomegranate</option>
            <option value="425">Poppy capsules</option>
            <option value="421">poppy seeds</option>
            <option value="24">Potato</option>
            <option value="84">Pumpkin</option>
            <option value="254">Pundi</option>
            <option value="128">Pundi Seed</option>
            <option value="447">Pupadia</option>
            <option value="161">Raddish</option>
            <option value="30">Ragi (Finger Millet)</option>
            <option value="409">Raibel</option>
            <option value="248">Rajgir</option>
            <option value="282">Ram</option>
            <option value="307">Rat Tail Radish (Mogari)</option>
            <option value="460">Ratanjot</option>
            <option value="65">Raya</option>
            <option value="7">Red Gram</option>
            <option value="322">Resinwood</option>
            <option value="62">Riccbcan</option>
            <option value="3">Rice</option>
            <option value="160">Ridgeguard(Tori)</option>
            <option value="374">Rose(Local)</option>
            <option value="228">Rose(Loose))</option>
            <option value="373">Rose(Tata)</option>
            <option value="306">Round gourd</option>
            <option value="111">Rubber</option>
            <option value="291">Sabu Dan</option>
            <option value="59">Safflower</option>
            <option value="338">Saffron</option>
            <option value="271">Sajje</option>
            <option value="468">salvia</option>
            <option value="122">Same/Savi</option>
            <option value="433">sanay</option>
            <option value="450">Sandalwood</option>
            <option value="247">Sarasum</option>
            <option value="277">Season Leaves</option>
            <option value="253">Seegu</option>
            <option value="176">Seemebadnekai</option>
            <option value="201">Seetapal</option>
            <option value="11">Sesamum(Sesame,Gingelly,Til)</option>
            <option value="464">sevanti</option>
            <option value="217">She Buffalo</option>
            <option value="283">She Goat</option>
            <option value="218">Sheep</option>
            <option value="183">Siddota</option>
            <option value="226">Skin And Hide</option>
            <option value="156">Snakeguard</option>
            <option value="135">Soanf</option>
            <option value="207">Soapnut(Antawala/Retha)</option>
            <option value="286">Soji</option>
            <option value="246">Sompu</option>
            <option value="13">Soyabean</option>
            <option value="455">spikenard</option>
            <option value="342">Spinach</option>
            <option value="311">Sponge gourd</option>
            <option value="332">Squash(Chappal Kadoo)</option>
            <option value="440">stevia</option>
            <option value="430">stone pulverizer</option>
            <option value="48">Sugar</option>
            <option value="150">Sugarcane</option>
            <option value="14">Sunflower</option>
            <option value="285">Sunflower Seed</option>
            <option value="139">Sunhemp</option>
            <option value="242">Suram</option>
            <option value="300">Surat Beans (Papadi)</option>
            <option value="255">Suva (Dill Seed)</option>
            <option value="178">Suvarna Gadde</option>
            <option value="152">Sweet Potato</option>
            <option value="173">Sweet Pumpkin</option>
            <option value="466">Sweet Sultan</option>
            <option value="477">sweet william</option>
            <option value="120">T.V. Cumbu</option>
            <option value="261">Tamarind Fruit</option>
            <option value="208">Tamarind Seed</option>
            <option value="100">Tapioca</option>
            <option value="76">Taramira</option>
            <option value="44">Tea</option>
            <option value="200">Tender Coconut</option>
            <option value="116">Thinai (Italian Millet)</option>
            <option value="170">Thogrikai</option>
            <option value="162">Thondekai</option>
            <option value="349">Tinda</option>
            <option value="141">Tobacco</option>
            <option value="78">Tomato</option>
            <option value="323">Torchwood</option>
            <option value="66">Toria</option>
            <option value="234">Tube Flower</option>
            <option value="401">Tube Rose(Double)</option>
            <option value="408">Tube Rose(Loose)</option>
            <option value="377">Tube Rose(Single)</option>
            <option value="463">tulip</option>
            <option value="39">Turmeric</option>
            <option value="309">Turmeric (raw)</option>
            <option value="341">Turnip</option>
            <option value="436">vadang</option>
            <option value="437">Vatsanabha</option>
            <option value="343">Walnut</option>
            <option value="73">Water Melon</option>
            <option value="1">Wheat</option>
            <option value="287">Wheat Atta</option>
            <option value="429">White Muesli</option>
            <option value="412">White Peas</option>
            <option value="158">White Pumpkin</option>
            <option value="203">Wood</option>
            <option value="348">Wool</option>
            <option value="244">Yam</option>
            <option value="297">Yam (Ratalu)</option>
          </select>
          {!loading ? (
            <button
              className="rounded-[10px] bg-blue-500 px-[20px] text-white"
              onClick={handleSubmit}
            >
              Get Price
            </button>
          ) : (
            <>
              <ScaleLoader />
            </>
          )}
        </div>
        <div class="container mx-auto mt-[80px] px-[10px]">
          <div class="grid grid-cols-2 gap-4">
            <div class="col">
              <div class="border border-gray-400 rounded-lg p-[10px]">
                <div class="font-semibold">Commodity</div>
                <div class="">{selectedCommodity}</div>
              </div>
            </div>
            <div class="col">
              <div class="border border-gray-400 rounded-lg p-[10px]">
                <div class="font-semibold">State</div>
                <div class="">Maharastra</div>
              </div>
            </div>

            <div class="col">
              <div class="border border-gray-400 rounded-lg p-[10px]">
                <div class="font-semibold">District</div>
                <div class="">Mumbai</div>
              </div>
            </div>
            <div class="col">
              <div class="border border-gray-400 rounded-lg p-[10px]">
                <div class="font-semibold">Market</div>
                <div class="">Thane</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 mt-4 gap-4">
            <div class="col">
              <div class="border border-gray-400 rounded-lg p-[10px]">
                <div class="font-semibold">Price</div>
                <div class="">{price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
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
              Home
            </div>
            <div
              className="flex items-center justify-center bg-blue-400 mt-[-30px] h-[80px] w-[80px] rounded-[50%] text-white"
              onClick={() => router.push("/disease")}
            >
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
              Profile
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Market;
