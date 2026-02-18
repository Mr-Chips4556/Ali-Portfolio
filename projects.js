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
        const forceReload = !localStorage.getItem('imagesUpdatedV3');

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
                    thumbnail: 'pics/project1/cover.png',
                    screenshots: [
                        'pics/project1/splash.png',
                        'pics/project1/home.png',
                        'pics/project1/prayers.png',
                        'pics/project1/community.png',
                        'pics/project1/ism.png',
                        'pics/project1/School.png'
                    ],
                    projectUrl: null,
                    createdAt: new Date('2024-01-15').toISOString()
                },
                {
                    id: 'xenscape-app',
                    title: 'Xenscape',
                    shortDescription: 'Meditation App - A comprehensive meditation and mindfulness application designed to help users achieve inner peace and mental wellness.',
                    fullDescription: 'Xenscape is a beautifully crafted meditation app that guides users through their mindfulness journey. Built with React Native, it offers personalized meditation sessions, breathing exercises, and wellness tracking to help users reduce stress and improve mental health.',
                    problemStatement: 'Modern life creates stress and anxiety, but people struggle to find time and guidance for effective meditation and mindfulness practices.',
                    solutionApproach: 'Created an intuitive meditation app with guided sessions, customizable timers, progress tracking, and personalized recommendations to make meditation accessible and engaging for everyone.',
                    features: [
                        'Guided meditation sessions for all levels',
                        'Customizable meditation timers and ambient sounds',
                        'Progress tracking and mindfulness streaks',
                        'Breathing exercises and relaxation techniques',
                        'Sleep stories and calming soundscapes',
                        'Daily mindfulness reminders and quotes',
                        'Offline meditation sessions',
                        'Personal wellness journal and mood tracking'
                    ],
                    technologies: ['React Native', 'Node.js', 'MongoDB', 'Audio Processing', 'Push Notifications', 'Analytics'],
                    thumbnail: 'pics/Project2/1.png',
                    screenshots: [
                        'pics/Project2/2.png',
                        'pics/Project2/3.png',
                        'pics/Project2/4.png',
                        'pics/Project2/8.png',
                        'pics/Project2/9.png',
                        'pics/Project2/10.png',
                        'pics/Project2/11.png',
                        'pics/Project2/12.png',
                        'pics/Project2/13.png',
                        'pics/Project2/14.png',
                        'pics/Project2/15.jpg'
                    ],
                    projectUrl: null,
                    createdAt: new Date('2024-03-10').toISOString()
                },
                {
                    id: 'dermascans-ai',
                    title: 'Dermascans-AI',
                    shortDescription: 'AI-powered dermatology application that uses machine learning to analyze skin conditions and provide preliminary assessments.',
                    fullDescription: 'Dermascans-AI is an innovative mobile application that leverages artificial intelligence and computer vision to help users monitor their skin health. The app provides preliminary skin analysis, tracks changes over time, and offers educational resources about dermatological conditions.',
                    problemStatement: 'Early detection of skin conditions is crucial for health, but access to dermatological expertise is limited and expensive, leading to delayed diagnosis and treatment.',
                    solutionApproach: 'Developed an AI-powered mobile solution that uses advanced image recognition and machine learning algorithms to provide preliminary skin analysis, making dermatological screening more accessible and affordable.',
                    features: [
                        'AI-powered skin condition analysis using computer vision',
                        'Photo-based skin health monitoring and tracking',
                        'Progress tracking with before/after comparisons',
                        'Educational resources about skin conditions',
                        'Reminder system for regular skin checks',
                        'Secure cloud storage for medical images',
                        'Integration with healthcare providers',
                        'Detailed analysis reports and recommendations'
                    ],
                    technologies: ['React Native', 'Computer Vision', 'Cloud Storage', 'Node.js', 'Firebase'],
                    thumbnail: 'pics/project3/1.png',
                    screenshots: [
                        'pics/project3/2.jpg',
                        'pics/project3/3.jpg',
                        'pics/project3/4.png',
                        'pics/project3/5.png',
                        'pics/project3/6.png'
                    ],
                    projectUrl: null,
                    createdAt: new Date('2024-02-20').toISOString()
                }
            ];
            this.saveProjects();
            localStorage.setItem('imagesUpdatedV3', 'true');
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
                         onerror="console.error('Failed to load thumbnail for ${project.title}:', '${project.thumbnail}'); this.src='https://via.placeholder.com/400x300/4A5568/FFFFFF?text=No+Image'"
                         onload="console.log('Successfully loaded thumbnail for ${project.title}:', '${project.thumbnail}')">
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
        localStorage.removeItem('imagesUpdatedV2');
        localStorage.removeItem('imagesUpdatedV3');
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