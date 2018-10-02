function setup() {
  noCanvas()
  frameRate(15)

  // setup the dom elements to show progress
  display = select('#display')
  result = select('#result')
  generation = document.querySelector('#generation span')

  populationSlider = createSlider(50, 200, 100, 1).parent('populationSlider')
  mutationRateSlider = createSlider(0, 5, 1, 0.1).parent('mutationRateSlider')
  createButton('Start algorithm').parent('start').mousePressed(startAlgorithm)

  cache = document.querySelector('#cache')
  fitness = document.querySelector('#fitness')
}

function draw() {
  if (population) {
    // calculate the fitness of the population
    population.calculateFitness()

    // show the most fit number of the population
    guess = population.strongest().substr(0, 1) + "." + population.strongest().substr(1)
    display.html(guess)

    // check to see if the algorithm was successful
    if (population.strongest() == pi.join('')) {
      result.html('Evolution completed!')
    } else {
      population.evolve()

      
      console.log(population)

      generation.innerHTML = population.generation
      
      createP(guess).parent(cache)
      createP(population.averageFitness()).parent(fitness)
      
      cache.scrollTop = cache.scrollHeight
      fitness.scrollTop = fitness.scrollHeight
    }
  }

  select('#population').html(`Population: ${populationSlider.value()}`)
  select('#mutationRate').html(`Mutation Rate: ${mutationRateSlider.value()}%`)
}

function startAlgorithm() {   
  // create a population with random genetics
  population = new Population(populationSlider.value(), mutationRateSlider.value() / 100.0)
}