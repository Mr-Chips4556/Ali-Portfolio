// Projects Management System
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.isAdmin = false;
        this.adminPassword = 'admin123'; // In production, use proper authentication
        this.init();
    }

    init() {
        this.loadProjects();
        this.setupEventListeners();
        this.renderProjects();

        // Show admin access button after a delay (for security)
        setTimeout(() => {
            document.getElementById('adminAccess').style.display = 'block';
        }, 3000);
    }

    // Load projects from localStorage or initialize with sample data
    loadProjects() {
        const savedProjects = localStorage.getItem('portfolioProjects');

        // Force reload with new image paths (remove this after first load)
        const forceReload = !localStorage.getItem('imagesUpdated');

        if (savedProjects && !forceReload) {
            this.projects = JSON.parse(savedProjects);
        } else {
            // Initialize with sample projects using local images
            this.projects = [
                {
                    id: 'guidance-ift',
                    title: 'Guidance_IFT',
                    shortDescription: 'A comprehensive mobile application for Toronto-based Muslims providing essential Islamic services and information.',
                    fullDescription: 'Guidance_IFT is a comprehensive mobile application designed specifically for the Toronto Muslim community. The app serves as a one-stop solution for accessing essential Islamic services, real-time prayer timings, and community resources.',
                    problemStatement: 'The Toronto Muslim community lacked a centralized platform to access essential Islamic services, prayer timings, and community information, leading to fragmented communication and missed opportunities for community engagement.',
                    solutionApproach: 'Developed a user-friendly mobile application that consolidates all essential Islamic services into one platform, featuring real-time data synchronization, location-based services, and offline functionality for reliable access.',
                    features: [
                        'Real-time Namaz (prayer) timings with location-based accuracy',
                        'Funeral services directory and notifications',
                        'Islamic educational resources and articles',
                        'Burial services information and booking',
                        'Marriage-related services and matchmaking',
                        'Community events and announcements',
                        'Offline functionality for essential features',
                        'Multi-language support (English/Arabic/Urdu)'
                    ],
                    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Push Notifications', 'AsyncStorage'],
                    thumbnail: 'pics/home.png',
                    screenshots: [
                        'pics/splash.png',
                        'pics/home.png',
                        'pics/prayers.png',
                        'pics/community.png',
                        'pics/ism.png',
                        'pics/School.png'
                    ],
                    projectUrl: null,
                    createdAt: new Date('2024-01-15').toISOString()
                },
                {
                    id: 'ecommerce-app',
                    title: 'E-Commerce Mobile App',
                    shortDescription: 'A modern e-commerce mobile application with advanced features for seamless shopping experience.',
                    fullDescription: 'A full-featured e-commerce mobile application built with React Native, offering users a seamless shopping experience with advanced search, personalized recommendations, and secure payment processing.',
                    problemStatement: 'Traditional e-commerce platforms lacked mobile-first design and personalized shopping experiences, resulting in poor user engagement and conversion rates.',
                    solutionApproach: 'Created a mobile-first e-commerce solution with AI-powered recommendations, advanced search capabilities, and streamlined checkout process to maximize user engagement and sales conversion.',
                    features: [
                        'Advanced product search and filtering',
                        'AI-powered product recommendations',
                        'Secure payment gateway integration',
                        'Real-time order tracking',
                        'Wishlist and favorites management',
                        'Push notifications for deals and updates',
                        'Social media integration for sharing',
                        'Multi-currency and multi-language support'
                    ],
                    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe API', 'Redux', 'Socket.io'],
                    thumbnail: 'https://via.placeholder.com/400x300/E53E3E/FFFFFF?text=E-Commerce+App',
                    screenshots: [
                        'https://via.placeholder.com/300x600/E53E3E/FFFFFF?text=Product+Catalog',
                        'https://via.placeholder.com/300x600/C53030/FFFFFF?text=Shopping+Cart',
                        'https://via.placeholder.com/300x600/9C2A2A/FFFFFF?text=Order+Tracking'
                    ],
                    projectUrl: 'https://example-ecommerce.com',
                    createdAt: new Date('2024-03-10').toISOString()
                },
                {
                    id: 'fitness-tracker',
                    title: 'Fitness Tracker Pro',
                    shortDescription: 'A comprehensive fitness tracking application with workout plans, nutrition tracking, and progress analytics.',
                    fullDescription: 'Fitness Tracker Pro is a comprehensive health and fitness application that helps users achieve their fitness goals through personalized workout plans, nutrition tracking, and detailed progress analytics.',
                    problemStatement: 'Users struggled to maintain consistent fitness routines due to lack of personalized guidance, progress tracking, and motivation, leading to abandoned fitness goals.',
                    solutionApproach: 'Developed an all-in-one fitness solution with AI-powered workout recommendations, comprehensive nutrition tracking, and gamification elements to keep users motivated and engaged.',
                    features: [
                        'Personalized workout plans based on fitness level',
                        'Comprehensive nutrition and calorie tracking',
                        'Progress analytics with detailed charts',
                        'Social features for community motivation',
                        'Integration with wearable devices',
                        'Custom exercise library with video demonstrations',
                        'Goal setting and achievement tracking',
                        'Offline workout mode'
                    ],
                    technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit API', 'Chart.js', 'AsyncStorage'],
                    thumbnail: 'https://via.placeholder.com/400x300/38A169/FFFFFF?text=Fitness+Tracker',
                    screenshots: [
                        'https://via.placeholder.com/300x600/38A169/FFFFFF?text=Workout+Plans',
                        'https://via.placeholder.com/300x600/2F855A/FFFFFF?text=Progress+Charts',
                        'https://via.placeholder.com/300x600/276749/FFFFFF?text=Nutrition+Log'
                    ],
                    projectUrl: 'https://fitness-tracker-pro.com',
                    createdAt: new Date('2024-02-20').toISOString()
                }
            ];
            this.saveProjects();
            localStorage.setItem('imagesUpdated', 'true');
        }
    }

    // Save projects to localStorage
    saveProjects() {
        localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
    }

    // Setup event listeners
    setupEventListeners() {
        // Admin login
        document.getElementById('adminLoginBtn').addEventListener('click', () => {
            document.getElementById('adminLoginModal').style.display = 'block';
        });

        document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin();
        });

        // Admin panel
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('addProjectBtn').addEventListener('click', () => {
            this.openProjectForm();
        });

        // Project form
        document.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject();
        });

        document.getElementById('cancelProjectForm').addEventListener('click', () => {
            this.closeProjectForm();
        });

        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeProjectModal();
        });

        document.getElementById('closeLoginModal').addEventListener('click', () => {
            this.closeLoginModal();
        });

        document.getElementById('closeProjectFormModal').addEventListener('click', () => {
            this.closeProjectForm();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    // Render projects in the public view
    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        const projectsCount = document.getElementById('projectsCount');
        const projectsLoading = document.getElementById('projectsLoading');

        // Show loading initially
        projectsLoading.style.display = 'block';
        projectsGrid.style.display = 'none';

        setTimeout(() => {
            projectsLoading.style.display = 'none';
            projectsGrid.style.display = 'grid';

            projectsCount.textContent = this.projects.length;

            if (this.projects.length === 0) {
                projectsGrid.innerHTML = `
                    <div class="no-projects">
                        <p>No projects available at the moment.</p>
                    </div>
                `;
                return;
            }

            projectsGrid.innerHTML = this.projects.map(project => `
                <div class="project-card" onclick="projectsManager.openProjectDetails('${project.id}')">
                    <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail" 
                         onerror="console.error('Failed to load thumbnail:', '${project.thumbnail}'); this.src='https://via.placeholder.com/400x300/4A5568/FFFFFF?text=No+Image'"
                         onload="console.log('Successfully loaded thumbnail:', '${project.thumbnail}')">
                    <div class="project-card-content">
                        <h3 class="project-card-title">${project.title}</h3>
                        <p class="project-card-desc">${project.shortDescription}</p>
                        <div class="project-tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        }, 1000);
    }

    // Open project details modal
    openProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="project-detail-header">
                <h2 class="project-detail-title">${project.title}</h2>
                <div class="project-detail-meta">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>

            <div class="project-detail-section">
                <h4>Project Overview</h4>
                <p>${project.fullDescription}</p>
            </div>

            <div class="project-detail-section">
                <h4>Problem Statement</h4>
                <p>${project.problemStatement}</p>
            </div>

            <div class="project-detail-section">
                <h4>Solution Approach</h4>
                <p>${project.solutionApproach}</p>
            </div>

            <div class="project-detail-section">
                <h4>Key Features</h4>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            ${project.screenshots && project.screenshots.length > 0 ? `
                <div class="project-detail-section">
                    <h4>Screenshots</h4>
                    <div class="project-screenshots">
                        ${project.screenshots.map(screenshot => `
                            <img src="${screenshot}" alt="Project Screenshot" class="project-screenshot"
                                 onerror="console.error('Failed to load screenshot:', '${screenshot}'); this.src='https://via.placeholder.com/300x600/4A5568/FFFFFF?text=No+Image'"
                                 onload="console.log('Successfully loaded screenshot:', '${screenshot}')">
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${project.projectUrl ? `
                <div class="project-detail-section">
                    <a href="${project.projectUrl}" target="_blank" class="btn btn-primary project-url-btn">
                        View Live Project
                    </a>
                </div>
            ` : ''}
        `;

        document.getElementById('projectModal').style.display = 'block';
    }

    // Close project details modal
    closeProjectModal() {
        document.getElementById('projectModal').style.display = 'none';
    }

    // Handle admin login
    handleAdminLogin() {
        const password = document.getElementById('adminPassword').value;
        if (password === this.adminPassword) {
            this.isAdmin = true;
            this.closeLoginModal();
            this.showAdminPanel();
            showNotification('Admin login successful!', 'success');
        } else {
            showNotification('Invalid password!', 'error');
        }
    }

    // Close login modal
    closeLoginModal() {
        document.getElementById('adminLoginModal').style.display = 'none';
        document.getElementById('adminPassword').value = '';
    }

    // Show admin panel
    showAdminPanel() {
        document.getElementById('adminPanel').style.display = 'block';
        this.renderAdminProjects();
    }

    // Render projects in admin panel
    renderAdminProjects() {
        const adminProjectsList = document.getElementById('adminProjectsList');

        if (this.projects.length === 0) {
            adminProjectsList.innerHTML = `
                <div class="no-projects">
                    <p>No projects found. Add your first project!</p>
                </div>
            `;
            return;
        }

        adminProjectsList.innerHTML = this.projects.map(project => `
            <div class="admin-project-item">
                <div class="admin-project-info">
                    <h4>${project.title}</h4>
                    <p>${project.shortDescription}</p>
                    <small>Created: ${new Date(project.createdAt).toLocaleDateString()}</small>
                </div>
                <div class="admin-project-actions">
                    <button class="btn btn-secondary" onclick="projectsManager.editProject('${project.id}')">
                        Edit
                    </button>
                    <button class="btn" style="background: #E53E3E; color: white;" 
                            onclick="projectsManager.deleteProject('${project.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Open project form for adding/editing
    openProjectForm(projectId = null) {
        const modal = document.getElementById('projectFormModal');
        const title = document.getElementById('projectFormTitle');
        const form = document.getElementById('projectForm');

        if (projectId) {
            const project = this.projects.find(p => p.id === projectId);
            if (!project) return;

            title.textContent = 'Edit Project';
            this.populateProjectForm(project);
        } else {
            title.textContent = 'Add New Project';
            form.reset();
            document.getElementById('projectId').value = '';
        }

        modal.style.display = 'block';
    }

    // Populate project form with existing data
    populateProjectForm(project) {
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectShortDesc').value = project.shortDescription;
        document.getElementById('projectFullDesc').value = project.fullDescription;
        document.getElementById('projectProblem').value = project.problemStatement;
        document.getElementById('projectSolution').value = project.solutionApproach;
        document.getElementById('projectFeatures').value = project.features.join('\n');
        document.getElementById('projectTech').value = project.technologies.join(', ');
        document.getElementById('projectThumbnail').value = project.thumbnail;
        document.getElementById('projectScreenshots').value = project.screenshots ? project.screenshots.join('\n') : '';
        document.getElementById('projectUrl').value = project.projectUrl || '';
    }

    // Save project (add or edit)
    saveProject() {
        const projectId = document.getElementById('projectId').value;
        const isEditing = !!projectId;

        const projectData = {
            id: projectId || this.generateProjectId(),
            title: document.getElementById('projectTitle').value.trim(),
            shortDescription: document.getElementById('projectShortDesc').value.trim(),
            fullDescription: document.getElementById('projectFullDesc').value.trim(),
            problemStatement: document.getElementById('projectProblem').value.trim(),
            solutionApproach: document.getElementById('projectSolution').value.trim(),
            features: document.getElementById('projectFeatures').value.trim().split('\n').filter(f => f.trim()),
            technologies: document.getElementById('projectTech').value.trim().split(',').map(t => t.trim()).filter(t => t),
            thumbnail: document.getElementById('projectThumbnail').value.trim(),
            screenshots: document.getElementById('projectScreenshots').value.trim().split('\n').filter(s => s.trim()),
            projectUrl: document.getElementById('projectUrl').value.trim() || null,
            createdAt: isEditing ? this.projects.find(p => p.id === projectId).createdAt : new Date().toISOString()
        };

        // Validation
        if (!projectData.title || !projectData.shortDescription || !projectData.fullDescription) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }

        if (isEditing) {
            const index = this.projects.findIndex(p => p.id === projectId);
            this.projects[index] = projectData;
            showNotification('Project updated successfully!', 'success');
        } else {
            this.projects.unshift(projectData);
            showNotification('Project added successfully!', 'success');
        }

        this.saveProjects();
        this.renderProjects();
        this.renderAdminProjects();
        this.closeProjectForm();
    }

    // Generate unique project ID
    generateProjectId() {
        return 'project-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Edit project
    editProject(projectId) {
        this.openProjectForm(projectId);
    }

    // Delete project
    deleteProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        if (confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            this.saveProjects();
            this.renderProjects();
            this.renderAdminProjects();
            showNotification('Project deleted successfully!', 'success');
        }
    }

    // Close project form
    closeProjectForm() {
        document.getElementById('projectFormModal').style.display = 'none';
    }

    // Logout admin
    logout() {
        this.isAdmin = false;
        document.getElementById('adminPanel').style.display = 'none';
        showNotification('Logged out successfully!', 'success');
    }

    // Clear cache and reload projects (for debugging)
    clearCacheAndReload() {
        localStorage.removeItem('portfolioProjects');
        localStorage.removeItem('imagesUpdated');
        this.loadProjects();
        this.renderProjects();
        if (this.isAdmin) {
            this.renderAdminProjects();
        }
        showNotification('Cache cleared and projects reloaded!', 'success');
    }
}

// Initialize projects manager when DOM is loaded
let projectsManager;
document.addEventListener('DOMContentLoaded', function () {
    projectsManager = new ProjectsManager();
});

// Export for global access
window.projectsManager = projectsManager;