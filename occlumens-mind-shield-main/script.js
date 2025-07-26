// Occlumens - Digital Defense Training App
class AurorShieldApp {
  constructor() {
    this.state = {
      isOnboarded: false,
      userHouse: '',
      userType: '',
      activeScreen: 'home',
      onboardingStep: 1
    };
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.initMagicalVortex();
    this.showOnboarding();
  }

  bindEvents() {
    // Onboarding events
    document.getElementById('begin-training-btn').addEventListener('click', () => {
      this.setOnboardingStep(2);
    });

    document.getElementById('back-to-step-1').addEventListener('click', () => {
      this.setOnboardingStep(1);
    });

    document.getElementById('continue-to-step-3').addEventListener('click', () => {
      this.setOnboardingStep(3);
    });

    document.getElementById('back-to-step-2').addEventListener('click', () => {
      this.setOnboardingStep(2);
    });

    document.getElementById('enter-academy').addEventListener('click', () => {
      this.completeOnboarding();
    });

    // House selection
    document.querySelectorAll('.house-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.selectHouse(e.currentTarget.dataset.house);
      });
    });

    // Wizard type selection
    document.querySelectorAll('.wizard-type-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.selectWizardType(e.currentTarget.dataset.type);
      });
    });
  }

  initMagicalVortex() {
    // Track mouse movement and create vortex effects on interactive elements
    let lastVortexTime = 0;
    const vortexCooldown = 200; // Minimum time between vortex effects in milliseconds
    
    document.addEventListener('mousemove', (e) => {
      const currentTime = Date.now();
      if (currentTime - lastVortexTime < vortexCooldown) return;
      
      const target = e.target.closest('.btn, .nav-btn, .house-card, .wizard-type-card, .card');
      if (target) {
        this.createMagicalVortex(e.clientX, e.clientY);
        lastVortexTime = currentTime;
      }
    });
    
    // Also trigger on click for extra magical feeling
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.btn, .nav-btn, .house-card, .wizard-type-card');
      if (target) {
        // Create a more intense vortex on click
        this.createMagicalVortex(e.clientX, e.clientY, true);
      }
    });
  }

  createMagicalVortex(x, y, intense = false) {
    const vortex = document.createElement('div');
    vortex.className = 'magical-vortex';
    
    // Position the vortex at cursor location
    vortex.style.left = x + 'px';
    vortex.style.top = y + 'px';
    
    // Make it more intense on click
    if (intense) {
      vortex.style.width = '120px';
      vortex.style.height = '120px';
      vortex.style.animationDuration = '1s';
    }
    
    document.body.appendChild(vortex);
    
    // Remove the vortex after animation completes
    setTimeout(() => {
      if (vortex.parentNode) {
        vortex.parentNode.removeChild(vortex);
      }
    }, intense ? 1000 : 800);
  }

  setOnboardingStep(step) {
    this.state.onboardingStep = step;
    
    // Hide all steps
    document.querySelectorAll('.step').forEach(stepEl => {
      stepEl.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${step}`).classList.add('active');
  }

  selectHouse(house) {
    this.state.userHouse = house;
    
    // Update UI
    document.querySelectorAll('.house-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    document.querySelector(`[data-house="${house}"]`).classList.add('selected');
    document.getElementById('continue-to-step-3').disabled = false;
  }

  selectWizardType(type) {
    this.state.userType = type;
    
    // Update UI
    document.querySelectorAll('.wizard-type-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    document.querySelector(`[data-type="${type}"]`).classList.add('selected');
    document.getElementById('enter-academy').disabled = false;
  }

  completeOnboarding() {
    if (!this.state.userHouse || !this.state.userType) return;
    
    this.state.isOnboarded = true;
    
    // Apply house theme
    document.documentElement.className = `${this.state.userHouse}-theme`;
    
    // Show main app
    this.showMainApp();
  }

  showOnboarding() {
    document.getElementById('onboarding-screen').classList.add('active');
    document.getElementById('main-app').classList.remove('active');
  }

  showMainApp() {
    document.getElementById('onboarding-screen').classList.remove('active');
    document.getElementById('main-app').classList.add('active');
    
    this.setupNavigation();
    this.updateUserInfo();
    this.showScreen('home');
  }

  setupNavigation() {
    const screens = [
      { id: 'home', label: 'Dashboard', icon: this.getHomeIcon(), urgent: false },
      { id: 'challenges', label: 'Daily Challenges', icon: this.getFlameIcon(), urgent: true },
      { id: 'skill-tree', label: 'Skill Tree', icon: this.getTreeIcon(), urgent: false },
      { id: 'simulator', label: 'Legilimency', icon: this.getEyeIcon(), urgent: false },
      { id: 'shield', label: 'Patronus Shield', icon: this.getShieldIcon(), urgent: false },
      { id: 'map', label: "Marauder's Map", icon: this.getBrainIcon(), urgent: false },
      { id: 'prophet', label: 'Daily Prophet', icon: this.getNewspaperIcon(), urgent: false }
    ];

    const navContainer = document.getElementById('nav-buttons');
    navContainer.innerHTML = '';

    screens.forEach(screen => {
      const button = document.createElement('button');
      button.className = `btn btn-outline nav-btn transition-magical ${this.state.activeScreen === screen.id ? 'active' : ''}`;
      button.innerHTML = `
        ${screen.icon}
        <span class="hidden sm:inline">${screen.label}</span>
      `;
      
      if (screen.urgent && this.state.activeScreen !== screen.id) {
        button.style.position = 'relative';
        const urgentBadge = document.createElement('div');
        urgentBadge.className = 'urgent-badge';
        urgentBadge.style.cssText = `
          position: absolute;
          top: -4px;
          right: -4px;
          background: hsl(25, 100%, 50%);
          color: white;
          font-size: 0.75rem;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          animation: pulse 2s infinite;
        `;
        urgentBadge.textContent = '!';
        button.appendChild(urgentBadge);
      }
      
      button.addEventListener('click', () => {
        this.showScreen(screen.id);
      });
      
      navContainer.appendChild(button);
    });
  }

  updateUserInfo() {
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `
      <div class="badge">${this.capitalizeFirst(this.state.userHouse)}</div>
      <div class="badge">${this.formatWizardType(this.state.userType)}</div>
    `;
  }

  showScreen(screenId) {
    this.state.activeScreen = screenId;
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Find and activate current button (this is a simplified approach)
    const currentIndex = ['home', 'challenges', 'skill-tree', 'simulator', 'shield', 'map', 'prophet'].indexOf(screenId);
    if (currentIndex >= 0) {
      document.querySelectorAll('.nav-btn')[currentIndex].classList.add('active');
    }
    
    // Update main content
    this.renderScreenContent(screenId);
  }

  renderScreenContent(screenId) {
    const mainContent = document.getElementById('main-content');
    
    switch (screenId) {
      case 'home':
        mainContent.innerHTML = this.renderDashboardHome();
        break;
      case 'challenges':
        mainContent.innerHTML = this.renderDailyChallenges();
        break;
      case 'skill-tree':
        mainContent.innerHTML = this.renderSkillTree();
        break;
      case 'simulator':
        mainContent.innerHTML = this.renderLegilimencySimulator();
        break;
      case 'shield':
        mainContent.innerHTML = this.renderPatronusShield();
        break;
      case 'map':
        mainContent.innerHTML = this.renderMarauderMap();
        break;
      case 'prophet':
        mainContent.innerHTML = this.renderDailyProphet();
        break;
      default:
        mainContent.innerHTML = this.renderDashboardHome();
    }
  }

  renderDashboardHome() {
    const houseColor = this.getHouseColor(this.state.userHouse);
    
    return `
      <div class="grid gap-6">
        <!-- Welcome Header -->
        <div class="card bg-card-95 border-accent-20 p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-3xl font-bold text-gradient-magical mb-2">
                Welcome, ${this.capitalizeFirst(this.state.userHouse)} Auror
              </h2>
              <p class="text-muted-foreground">
                ${this.formatWizardType(this.state.userType)} • Level 1 Defense Specialist
              </p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold ${houseColor}">Level 1</div>
              <div class="text-sm text-muted-foreground">Defense Initiate</div>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="card bg-card-95 border-accent-20 p-4 text-center">
            <div class="text-2xl font-bold text-accent mb-2">0</div>
            <div class="text-sm text-muted-foreground">Threats Blocked</div>
          </div>
          <div class="card bg-card-95 border-accent-20 p-4 text-center">
            <div class="text-2xl font-bold text-accent mb-2">0%</div>
            <div class="text-sm text-muted-foreground">Defense Mastery</div>
          </div>
          <div class="card bg-card-95 border-accent-20 p-4 text-center">
            <div class="text-2xl font-bold text-accent mb-2">0</div>
            <div class="text-sm text-muted-foreground">Skill Points</div>
          </div>
          <div class="card bg-card-95 border-accent-20 p-4 text-center">
            <div class="text-2xl font-bold text-accent mb-2">0</div>
            <div class="text-sm text-muted-foreground">Badges Earned</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card bg-card-95 border-accent-20 p-6">
          <h3 class="text-xl font-semibold mb-4 text-foreground">Quick Actions</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button class="btn btn-accent transition-magical" onclick="app.showScreen('challenges')">
              ${this.getFlameIcon()}
              Start Daily Challenges
            </button>
            <button class="btn btn-outline transition-magical" onclick="app.showScreen('skill-tree')">
              ${this.getTreeIcon()}
              View Skill Tree
            </button>
            <button class="btn btn-outline transition-magical" onclick="app.showScreen('simulator')">
              ${this.getEyeIcon()}
              Practice Simulation
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderDailyChallenges() {
    return `
      <div class="grid gap-6">
        <div class="card bg-card-95 border-accent-20 p-6">
          <h2 class="text-3xl font-bold text-gradient-magical mb-4">Daily Challenges</h2>
          <p class="text-muted-foreground mb-6">Complete these challenges to strengthen your mental defenses and earn experience points.</p>
          
          <!-- Challenge Cards -->
          <div class="grid gap-4">
            <div class="card border-accent-20 p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold">Phishing Email Detection</h3>
                <div class="badge">+50 XP</div>
              </div>
              <p class="text-muted-foreground mb-4">Identify 5 phishing attempts in your simulated inbox</p>
              <button class="btn btn-accent">Start Challenge</button>
            </div>
            
            <div class="card border-accent-20 p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold">Social Engineering Defense</h3>
                <div class="badge">+75 XP</div>
              </div>
              <p class="text-muted-foreground mb-4">Resist 3 social engineering attacks</p>
              <button class="btn btn-accent">Start Challenge</button>
            </div>
            
            <div class="card border-accent-20 p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold">Password Spell Strengthening</h3>
                <div class="badge">+25 XP</div>
              </div>
              <p class="text-muted-foreground mb-4">Create 3 strong passwords using magical techniques</p>
              <button class="btn btn-accent">Start Challenge</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSkillTree() {
    return `
      <div class="grid gap-6">
        <div class="card bg-card-95 border-accent-20 p-6">
          <h2 class="text-3xl font-bold text-gradient-magical mb-4">Auror Skill Tree</h2>
          <p class="text-muted-foreground mb-6">Develop your magical defenses through specialized training paths.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Email Defense Branch -->
            <div class="card border-accent-20 p-4">
              <h3 class="text-xl font-semibold mb-4 text-accent">Email Defense</h3>
              <div class="space-y-3">
                <div class="skill-node available">
                  <div class="font-semibold">Basic Phishing Detection</div>
                  <div class="text-sm text-muted-foreground">Recognize common phishing patterns</div>
                </div>
                <div class="skill-node locked">
                  <div class="font-semibold">Advanced Header Analysis</div>
                  <div class="text-sm text-muted-foreground">Examine email headers for authenticity</div>
                </div>
                <div class="skill-node locked">
                  <div class="font-semibold">Spear Phishing Master</div>
                  <div class="text-sm text-muted-foreground">Detect targeted attacks</div>
                </div>
              </div>
            </div>

            <!-- Social Engineering Defense -->
            <div class="card border-accent-20 p-4">
              <h3 class="text-xl font-semibold mb-4 text-accent">Social Engineering</h3>
              <div class="space-y-3">
                <div class="skill-node available">
                  <div class="font-semibold">Urgency Resistance</div>
                  <div class="text-sm text-muted-foreground">Resist pressure tactics</div>
                </div>
                <div class="skill-node locked">
                  <div class="font-semibold">Authority Verification</div>
                  <div class="text-sm text-muted-foreground">Validate requests from authority figures</div>
                </div>
                <div class="skill-node locked">
                  <div class="font-semibold">Pretexting Defense</div>
                  <div class="text-sm text-muted-foreground">See through elaborate stories</div>
                </div>
              </div>
            </div>

            <!-- Digital Hygiene -->
            <div class="card border-accent-20 p-4">
              <h3 class="text-xl font-semibold mb-4 text-accent">Digital Hygiene</h3>
              <div class="space-y-3">
                <div class="skill-node available">
                  <div class="font-semibold">Password Strengthening</div>
                  <div class="text-sm text-muted-foreground">Create unbreakable passwords</div>
                </div>
                <div class="skill-node locked">
                  <div class="font-semibold">Two-Factor Authentication</div>
                  <div class="text-sm text-muted-foreground">Add extra security layers</div>
                </div>
                <div class="skill-node locked">
                  <div class="font-semibold">Privacy Shielding</div>
                  <div class="text-sm text-muted-foreground">Protect personal information</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderLegilimencySimulator() {
    return `
      <div class="grid gap-6">
        <div class="card bg-card-95 border-accent-20 p-6">
          <h2 class="text-3xl font-bold text-gradient-magical mb-4">Legilimency Simulator</h2>
          <p class="text-muted-foreground mb-6">Practice your mental defenses against digital manipulation attacks in a safe environment.</p>
          
          <div class="card border-accent-20 p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">Current Scenario: Suspicious Email</h3>
            <div class="bg-muted p-4 rounded-lg mb-4">
              <div class="font-semibold mb-2">From: security@youbank.com</div>
              <div class="font-semibold mb-2">Subject: URGENT: Verify Your Account</div>
              <div class="text-sm">
                Dear Customer,<br><br>
                We have detected suspicious activity on your account. Please click the link below to verify your identity immediately or your account will be suspended within 24 hours.
                <br><br>
                <a href="#" class="text-accent">Verify Account Now</a>
                <br><br>
                Thank you,<br>
                Security Team
              </div>
            </div>
            
            <h4 class="font-semibold mb-3">How should you respond?</h4>
            <div class="grid gap-2">
              <button class="btn btn-outline text-left">Click the link to verify my account</button>
              <button class="btn btn-outline text-left">Forward this to friends as a warning</button>
              <button class="btn btn-accent text-left">Delete the email and contact the bank directly</button>
              <button class="btn btn-outline text-left">Reply asking for more information</button>
            </div>
          </div>
          
          <div class="flex justify-between">
            <button class="btn btn-outline">Previous Scenario</button>
            <div class="text-muted-foreground">Scenario 1 of 10</div>
            <button class="btn btn-outline">Next Scenario</button>
          </div>
        </div>
      </div>
    `;
  }

  renderPatronusShield() {
    return `
      <div class="grid gap-6">
        <div class="card bg-card-95 border-accent-20 p-6">
          <h2 class="text-3xl font-bold text-gradient-magical mb-4">Patronus Shield</h2>
          <p class="text-muted-foreground mb-6">Activate your personal protection against digital dementors and manipulation attacks.</p>
          
          <div class="text-center mb-8">
            <div class="mb-6">
              ${this.getShieldIcon('h-24 w-24 text-accent glow-magical mx-auto')}
            </div>
            <h3 class="text-2xl font-semibold mb-2">Your Patronus: Digital Guardian</h3>
            <p class="text-muted-foreground">Protection Level: Novice</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card border-accent-20 p-4">
              <h4 class="font-semibold mb-3">Active Protections</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Email Filtering</span>
                  <span class="text-accent">Active</span>
                </div>
                <div class="flex justify-between">
                  <span>Suspicious Link Detection</span>
                  <span class="text-muted-foreground">Inactive</span>
                </div>
                <div class="flex justify-between">
                  <span>Social Engineering Alerts</span>
                  <span class="text-muted-foreground">Inactive</span>
                </div>
              </div>
            </div>
            
            <div class="card border-accent-20 p-4">
              <h4 class="font-semibold mb-3">Shield Strength</h4>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm">Phishing Defense</span>
                    <span class="text-sm">25%</span>
                  </div>
                  <div class="w-full bg-muted rounded-full h-2">
                    <div class="bg-accent h-2 rounded-full" style="width: 25%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm">Social Engineering</span>
                    <span class="text-sm">10%</span>
                  </div>
                  <div class="w-full bg-muted rounded-full h-2">
                    <div class="bg-accent h-2 rounded-full" style="width: 10%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-6">
            <button class="btn btn-accent glow-primary">Strengthen Your Patronus</button>
          </div>
        </div>
      </div>
    `;
  }

  renderMarauderMap() {
    return `
      <div class="grid gap-6">
        <div class="card bg-card-95 border-accent-20 p-6">
          <h2 class="text-3xl font-bold text-gradient-magical mb-4">Marauder's Map</h2>
          <p class="text-muted-foreground mb-6">Track digital threats and monitor your defensive progress across the cybersecurity landscape.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card border-accent-20 p-4">
              <h3 class="text-lg font-semibold mb-4">Threat Detection</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span>Phishing Attempts</span>
                  <span class="badge">3 Blocked</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Malicious Links</span>
                  <span class="badge">1 Detected</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Social Engineering</span>
                  <span class="badge">0 Attempts</span>
                </div>
              </div>
            </div>
            
            <div class="card border-accent-20 p-4">
              <h3 class="text-lg font-semibold mb-4">Training Progress</h3>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm">Email Defense</span>
                    <span class="text-sm">Level 1</span>
                  </div>
                  <div class="w-full bg-muted rounded-full h-2">
                    <div class="bg-accent h-2 rounded-full" style="width: 30%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm">Social Engineering</span>
                    <span class="text-sm">Level 0</span>
                  </div>
                  <div class="w-full bg-muted rounded-full h-2">
                    <div class="bg-accent h-2 rounded-full" style="width: 5%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card border-accent-20 p-4 mt-6">
            <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>Completed: Basic Phishing Detection</span>
                <span class="text-muted-foreground">2 hours ago</span>
              </div>
              <div class="flex justify-between">
                <span>Blocked: Suspicious email from unknown sender</span>
                <span class="text-muted-foreground">1 day ago</span>
              </div>
              <div class="flex justify-between">
                <span>Started: Auror Shield training</span>
                <span class="text-muted-foreground">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderDailyProphet() {
    return `
      <div class="grid gap-6">
        <div class="card bg-card-95 border-accent-20 p-6">
          <h2 class="text-3xl font-bold text-gradient-magical mb-4">The Daily Prophet</h2>
          <p class="text-muted-foreground mb-6">Stay informed about the latest threats in the digital realm and cybersecurity developments.</p>
          
          <!-- Featured Article -->
          <div class="card border-accent-20 p-6 mb-6">
            <div class="badge mb-2">ALERT</div>
            <h3 class="text-xl font-semibold mb-2">New Phishing Campaign Targets Banking Customers</h3>
            <p class="text-muted-foreground mb-4">
              Dark wizards have launched a sophisticated phishing campaign impersonating major banks. 
              The emails appear legitimate but contain malicious links designed to steal credentials.
            </p>
            <button class="btn btn-accent">Read Full Article</button>
          </div>
          
          <!-- Other Articles -->
          <div class="grid gap-4">
            <div class="card border-accent-20 p-4">
              <div class="flex justify-between items-start mb-2">
                <div class="badge">TIP</div>
                <span class="text-sm text-muted-foreground">2 min read</span>
              </div>
              <h4 class="font-semibold mb-2">How to Strengthen Your Password Spells</h4>
              <p class="text-sm text-muted-foreground">Learn the magical techniques for creating unbreakable passwords...</p>
            </div>
            
            <div class="card border-accent-20 p-4">
              <div class="flex justify-between items-start mb-2">
                <div class="badge">UPDATE</div>
                <span class="text-sm text-muted-foreground">3 min read</span>
              </div>
              <h4 class="font-semibold mb-2">Ministry of Magic Updates Digital Defense Protocols</h4>
              <p class="text-sm text-muted-foreground">New guidelines for protecting against social engineering attacks...</p>
            </div>
            
            <div class="card border-accent-20 p-4">
              <div class="flex justify-between items-start mb-2">
                <div class="badge">TREND</div>
                <span class="text-sm text-muted-foreground">4 min read</span>
              </div>
              <h4 class="font-semibold mb-2">Rise in AI-Generated Deception Spells</h4>
              <p class="text-sm text-muted-foreground">How artificial intelligence is being used to create more convincing scams...</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Helper methods
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  formatWizardType(type) {
    return type.split('-').map(word => this.capitalizeFirst(word)).join('-');
  }

  getHouseColor(house) {
    const colors = {
      gryffindor: 'text-red-400',
      ravenclaw: 'text-blue-400',
      hufflepuff: 'text-yellow-400',
      slytherin: 'text-green-400'
    };
    return colors[house] || 'text-accent';
  }

  // SVG Icons
  getHomeIcon() {
    return `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>`;
  }

  getFlameIcon() {
    return `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 4-4 5 0 8 4 8 8a8 8 0 01-1.657 4.657z"></path>
    </svg>`;
  }

  getTreeIcon() {
    return `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
    </svg>`;
  }

  getEyeIcon() {
    return `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    </svg>`;
  }

  getShieldIcon(customClass = 'h-4 w-4') {
    return `<svg class="${customClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>`;
  }

  getBrainIcon() {
    return `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
    </svg>`;
  }

  getNewspaperIcon() {
    return `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
    </svg>`;
  }
}

// Add pulse animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .skill-node {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
  }
  
  .skill-node.available {
    background: var(--card);
    border-color: var(--accent);
  }
  
  .skill-node.locked {
    background: var(--muted);
    opacity: 0.6;
  }
  
  @media (min-width: 640px) {
    .sm\\:inline { display: inline !important; }
  }
  
  @media (min-width: 768px) {
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
  
  .hidden { display: none; }
  
  .h-24 { height: 6rem; }
  .w-24 { width: 6rem; }
`;
document.head.appendChild(style);

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new AurorShieldApp();
});
