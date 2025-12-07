document.addEventListener('DOMContentLoaded', function() {
    // Glorp expressions with full paths
    const glorpExpressions = [
        'images/glorp.png',
        'images/happyglorp.png',
        'images/sadglorp.png'
    ];

    // Set up Glorp click handler
    const glorpImage = document.querySelector('.glorp-image');
    if (glorpImage) {
        // Set initial image
        glorpImage.src = glorpExpressions[0];
        
        glorpImage.addEventListener('click', function() {
            // Add a quick fade out
            this.style.opacity = '0.5';
            this.style.transform = 'scale(0.95)';
            
            // Change the image after a short delay for better effect
            setTimeout(() => {
                const currentSrc = this.src.split('/').pop();
                const currentPath = this.src.substring(0, this.src.lastIndexOf('/') + 1);
                const currentFile = currentSrc.includes('?') ? currentSrc.split('?')[0] : currentSrc;
                
                // Find current index or default to 0
                let currentIndex = 0;
                for (let i = 0; i < glorpExpressions.length; i++) {
                    if (glorpExpressions[i].includes(currentFile)) {
                        currentIndex = i;
                        break;
                    }
                }
                
                // Get next image (with wrap-around)
                const nextIndex = (currentIndex + 1) % glorpExpressions.length;
                
                // Add timestamp to prevent caching issues
                this.src = glorpExpressions[nextIndex] + '?t=' + new Date().getTime();
                
                // Fade back in with new image
                this.style.opacity = '1';
                this.style.transform = 'scale(1.05)';
                
                // Reset transform after animation
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
            }, 100);
        });
    }

    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    
    function switchPage(pageId) {
        // Remove active class from all buttons and pages
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked button
        document.querySelector(`.nav-btn[data-page="${pageId}"]`).classList.add('active');
        
        // Show corresponding page
        document.getElementById(pageId).classList.add('active');
    }
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // Initialize first page
    switchPage('home');
    
    // Planet/Object selection
    const menuItems = document.querySelectorAll('.menu-item');
    const planetImage = document.getElementById('planet-image');
    const planetName = document.getElementById('planet-name');
    const planetFacts = document.getElementById('planet-facts');
    const funFact = document.getElementById('fun-fact');
    
    // Sample data (in a real app, this would come from an API)
    const solarData = {
        sun: {
            name: 'Sun',
            facts: "The Sun is a massive ball of hot plasma, containing 99.86% of the solar system's mass. It's about 4.6 billion years old and converts 600 million tons of hydrogen into helium every second through nuclear fusion.",
            funFact: "The Sun is so big that about 1.3 million Earths could fit inside it! And its light takes 8 minutes and 20 seconds to reach Earth. That means when you look at the Sun (don't actually look directly at it!), you're seeing it as it was 8 minutes ago!"
        },
        mercury: {
            name: 'Mercury',
            facts: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has a very thin atmosphere and no moons. A year on Mercury is just 88 days long, but a day lasts 59 Earth days!',
            funFact: 'Mercury is shrinking! As its core cools, the planet contracts, causing its surface to wrinkle like a raisin. These wrinkles can be hundreds of miles long!'
        },
        venus: {
            name: 'Venus',
            facts: 'Venus is the second planet from the Sun and Earth\'s closest planetary neighbor. It has a toxic atmosphere of carbon dioxide with clouds of sulfuric acid, making it the hottest planet in our solar system.',
            funFact: 'A day on Venus is longer than a year on Venus! It takes 243 Earth days to rotate once on its axis, but only 225 Earth days to orbit the Sun.'
        },
        earth: {
            name: 'Earth',
            facts: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth\'s surface is covered with water, mostly by oceans.',
            funFact: 'Earth is the only planet not named after a god. The name comes from the Old English word "eorthe" and the Anglo-Saxon word "erda," which means ground or soil.'
        },
        mars: {
            name: 'Mars',
            facts: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System after Mercury. It has the largest volcano and the tallest mountain in the solar system, Olympus Mons.',
            funFact: 'Mars has the largest dust storms in the solar system. They can last for months and cover the entire planet! The thin atmosphere makes the storms much less powerful than they would be on Earth, though.'
        },
        jupiter: {
            name: 'Jupiter',
            facts: 'Jupiter is the largest planet in our solar system, more than twice as massive as all other planets combined. It has 79 known moons and a strong magnetic field.',
            funFact: 'Jupiter has a storm called the Great Red Spot that has been raging for at least 400 years. It\'s so big that three Earths could fit inside it!'
        },
        saturn: {
            name: 'Saturn',
            facts: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth.',
            funFact: 'Saturn could float in water because it\'s less dense than water! If you could find a bathtub big enough, that is. It\'s the only planet in our solar system that would float.'
        },
        uranus: {
            name: 'Uranus',
            facts: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. It rotates on its side with an axial tilt of 98 degrees.',
            funFact: 'Uranus rotates on its side, which means it essentially rolls around the Sun like a ball. This unusual tilt may be the result of a collision with an Earth-sized object long ago.'
        },
        neptune: {
            name: 'Neptune',
            facts: 'Neptune is the eighth and most distant known planet from the Sun in the Solar System. It is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.',
            funFact: 'Neptune was the first planet located through mathematical calculations rather than through regular observations of the sky. It was discovered in 1846 after astronomers noticed that Uranus wasn\'t moving as expected.'
        },
        moons: {
            name: 'Moons',
            facts: 'Moons are natural satellites that orbit planets. Our solar system has over 200 known moons! They come in all shapes and sizes - some are tiny rocks, while others like Ganymede are larger than the planet Mercury. Moons are held in orbit by their planet\'s gravity.',
            funFact: 'Not all planets have moons! Mercury and Venus have zero moons, while Jupiter has 95 known moons - it\'s like having its own mini solar system! Some moons like Europa and Enceladus might have oceans under their icy surfaces where alien life could exist!'
        },
        asteroids: {
            name: 'Asteroids',
            facts: 'Asteroids are rocky objects that orbit the Sun but are too small to be called planets. Most asteroids are found in the asteroid belt between Mars and Jupiter. They range in size from tiny pebbles to objects hundreds of kilometers wide like Ceres.',
            funFact: 'Asteroids are leftover building blocks from when the solar system formed 4.6 billion years ago! They never got to become a planet because Jupiter\'s gravity kept stirring them up. Some asteroids are actually more valuable than Earth - one called 16 Psyche is made of metal worth quintillions of dollars!'
        },
        meteoroids: {
            name: 'Meteoroids & Comets',
            facts: 'Meteoroids are small rocky or metallic objects in space. When they enter Earth\'s atmosphere and burn up, we call them meteors or "shooting stars." If they survive and hit the ground, they\'re called meteorites. Comets are icy objects that develop glowing tails when they approach the Sun.',
            funFact: 'Every day, about 100 tons of dust and sand-sized particles fall to Earth from space! Comets are like dirty snowballs - they\'re made of ice, dust, and rock. When a comet gets close to the Sun, the ice turns to gas and creates those beautiful glowing tails that can stretch millions of kilometers!'
        }
    };
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the object data
            const objectId = this.getAttribute('data-object');
            const objectData = solarData[objectId];
            
            // Update the display
            planetName.textContent = objectData.name;
            planetImage.textContent = `[${objectData.name} Image Here]`;
            planetFacts.textContent = objectData.facts;
            funFact.textContent = objectData.funFact;
            
            // Add animation
            planetImage.style.animation = 'none';
            setTimeout(() => {
                planetImage.style.animation = 'pulse 1s';
            }, 10);
        });
    });
    
    // Update menu items click handler
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the object data
            const objectId = this.getAttribute('data-object');
            const objectData = solarData[objectId];
            
            // Update the display
            if (objectData) {
                planetName.textContent = objectData.name;
                planetFacts.textContent = objectData.facts;
                funFact.textContent = objectData.funFact;
                
                // Add animation
                planetImage.style.animation = 'none';
                setTimeout(() => {
                    planetImage.style.animation = 'pulse 1s';
                }, 10);
            }
        });
    });

    // Update nav buttons click handler
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });

    // Initialize with Sun selected
    const sunItem = document.querySelector('.menu-item[data-object="sun"]');
    if (sunItem) {
        sunItem.dispatchEvent(new Event('click'));
    }
    
    // Initialize first page
    switchPage('home');
});
