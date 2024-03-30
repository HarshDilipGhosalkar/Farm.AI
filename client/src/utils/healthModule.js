const healthModules = [
  {
    number: 1,
    title: "Soil Health and Management",
    description:
      "Understand the importance of soil health in agriculture and learn about various soil management practices such as crop rotation, cover cropping, and composting.",
  },
  {
    number: 2,
    title: "Crop Selection and Planning",
    description:
      "Explore different crop varieties suitable for your region and learn how to plan your crop rotations and planting schedules for optimal yield and sustainability.",
  },
  
  {
    number: 3,
    title: "Irrigation Methods",
    description:
      "There are several irrigation methods available to farmers, each suited for different crops, soil types, and climates.",
    content: (
      <div class="mx-auto">
        <div class="mb-6">
          <p>
          <h3 class="text-2xl font-semibold mb-2">Drip Irrigation</h3>
          Drip irrigation delivers water directly to the base of plants through a network of tubes or pipes with emitters. This method is highly efficient as it minimizes water wastage by delivering water precisely where it is needed.
          </p>
          
          <img
            src="/assets/learning/drip_irrigation.jpg"
            alt="Drip Irrigation System"
            class="w-full h-auto mb-4"
          />
        </div>
          
        <div class="mb-6">
          <h4 class="text-2xl font-semibold mb-2">Key components of a drip irrigation</h4>
         
          
          <ul class="list-disc list-inside ml-4">
            <li>Water source.</li>
            <li>Mainline.</li>
            <li>Sub-main lines.</li>
            <li>Drip tubing.</li>
            <li>Emitters.</li>
          
            </ul>
        </div>


        <div class="mb-6">
          <p>
          <h3 class="text-2xl font-semibold mb-2">Sprinkler Irrigation</h3>
          Sprinkler irrigation involves spraying water over the crop area, simulating natural rainfall. This method is suitable for a wide range of crops and can cover large areas efficiently. </p>
         
          <img
            src="/assets/learning/sprinkler.jpg"
            alt="Sprinkler Irrigation"
            class="w-full h-auto mb-4"
          />
        </div>
          
        <div class="mb-6">
          <h4 class="text-2xl font-semibold mb-2">Key components of a drip irrigation</h4>
         
          
          <ul class="list-disc list-inside ml-4">
            <li>Water source.</li>
            <li>Pump.</li>
            <li>Piping Network.</li>
            <li>Sprinkler Heads.</li>
            <li>Nozzles.</li>
          
            </ul>
        </div>


        <div class="mb-6">
          <p>
          <h3 class="text-2xl font-semibold mb-2">Furrow Irrigation</h3>
          Furrow irrigation involves creating small channels (furrows) between rows of crops and allowing water to flow through them. This method is commonly used for row crops such as maize and soybeans.</p>
         
          <img
            src="/assets/learning/furrow.jpg"
            alt="Furrow Irrigation"
            class="w-full h-auto mb-4"
          />
        </div>
          
        <div class="mb-6">
          <h4 class="text-2xl font-semibold mb-2">Key components of a drip irrigation</h4>
         
          
          <ul class="list-disc list-inside ml-4">
            <li>Field Layout.</li>
            <li>Furrows.</li>
            <li>Head Ditch or Supply Channel.</li>
            <li>Water Control Structures.</li>
            <li>Erosion Control Measures.</li>
          
            </ul>
        </div>
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2">
            Conclusion
          </h2>
          <p>
          Furrow irrigation is traditional but less efficient, prone to soil erosion. Sprinkler irrigation mimics rainfall, adaptable but with water loss risks. Drip irrigation offers precision, minimizing waste, ideal for water scarcity and sustainable crop hydration.
           </p>
          
        </div>

        

        
      </div>
    ),
  },

  {
    number: 4,
    title: "Pest and Disease Management",
    description:
      "Learn about common pests and diseases affecting crops and effective strategies for prevention and control, including integrated pest management (IPM) techniques.",
      content: (
        <div class="mx-auto">
          <div class="mb-6">
            <p>
            Pest and disease management in agriculture involves strategies to prevent, monitor, and control the spread of pests (insects, mites, rodents, etc.) and diseases that can damage crops. </p>
            
            <img
              src="/assets/moduleImages/drip_irrigation.jpg"
              alt="Drip Irrigation System"
              class="w-full h-auto mb-4"
            />
          </div>
            
          <div class="mb-6">
            <h4 class="text-2xl font-semibold mb-2">Different Strategies</h4>
           
            
            <ul class="list list-inside ml-4">
              <li><h6 class="text-xl font-semibold mb-2">Preventive Measures:</h6> Implementing practices such as crop rotation, proper sanitation, use of disease-resistant varieties, and maintaining healthy soil and plant nutrition to minimize the risk of pest and disease outbreaks.</li>
              <li><h6 class="text-xl font-semibold mb-2">Monitoring and Early Detection:</h6>Regularly inspecting crops for signs of pest infestation or disease symptoms allows for early intervention, reducing potential damage. Monitoring methods may include traps, visual surveys, and disease forecasting models.</li>
              <li><h6 class="text-xl font-semibold mb-2">Cultural Control:</h6> Utilizing cultural practices like planting diverse crops, adjusting planting dates, pruning infected plant parts, and managing irrigation and drainage systems can help reduce pest and disease pressure.</li>
              <li><h6 class="text-xl font-semibold mb-2">Biological Control:</h6> Introducing natural predators, parasites, or pathogens that target specific pests or diseases can help control their populations. Biological control methods aim to maintain ecological balance and minimize the use of chemical pesticides.</li>
              <li><h6 class="text-xl font-semibold mb-2">Integrated Pest Management (IPM):</h6> IPM combines multiple pest management strategies, including cultural, biological, and chemical control methods, to achieve sustainable pest control while minimizing risks to human health, beneficial organisms, and the environment.</li>
             </ul>
          </div>
        </div>
      ),
  },
  {
    number: 5,
    title: "Harvesting and Post-Harvest Handling",
    description:
      "Understand the best practices for harvesting crops at the right time and techniques for post-harvest handling to maintain quality and prolong shelf life.",
  },
];

export default healthModules;

