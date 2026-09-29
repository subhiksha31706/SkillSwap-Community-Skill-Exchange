
const STORAGE_KEY = "SKILLSWAP_APP_DATA_V1";
const DEFAULT_APP_DATA = {
    profile: {
        name: "Alex Morgan",
        role: "Computer Science Student",
        institution: "KL University",
        bio: "Passionate about Web Development, Python, and UI Design. Looking to trade frontend skills for Public Speaking & Digital Marketing knowledge!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        streakDays: 5
    },
    userSkills: [
        { id: "s1", name: "HTML & CSS Layouts", category: "Programming", type: "offer", level: "Advanced" },
        { id: "s2", name: "JavaScript Fundamentals", category: "Programming", type: "offer", level: "Intermediate" },
        { id: "s3", name: "UI/UX Prototyping", category: "Design", type: "offer", level: "Intermediate" },
        { id: "s4", name: "Python Data Science", category: "Programming", type: "learn", level: "Beginner" },
        { id: "s5", name: "Public Speaking", category: "Communication", type: "learn", level: "Beginner" },
        { id: "s6", name: "Video Editing (Premiere Pro)", category: "Photography", type: "learn", level: "Beginner" }
    ],
    communityPartners: [
        {
            id: "u101",
            name: "Rahul Sharma",
            role: "Software Engineering Student",
            institution: "KL University",
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
            skillsOffered: ["Python Data Science", "Machine Learning Basics", "Git & GitHub"],
            skillsNeeded: ["JavaScript Fundamentals", "UI/UX Prototyping"],
            rating: 4.9
        },
        {
            id: "u102",
            name: "Priya Verma",
            role: "Digital Media Scholar",
            institution: "Design Academy",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            skillsOffered: ["Public Speaking", "Content Writing", "Graphic Design"],
            skillsNeeded: ["HTML & CSS Layouts", "SEO Basics"],
            rating: 4.8
        },
        {
            id: "u103",
            name: "Vikram Reddy",
            role: "Multimedia Specialist",
            institution: "Tech Institute",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            skillsOffered: ["Video Editing (Premiere Pro)", "Photography Techniques", "After Effects"],
            skillsNeeded: ["Python Data Science", "Web Development"],
            rating: 4.95
        },
        {
            id: "u104",
            name: "Ananya Das",
            role: "Marketing Analyst",
            institution: "School of Business",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
            skillsOffered: ["Digital Marketing Strategy", "Social Media Analytics", "Public Speaking"],
            skillsNeeded: ["JavaScript Fundamentals", "Data Visualization"],
            rating: 4.7
        }
    ],
    goals: [
        { id: "g1", title: "Complete 5 Pair Programming Sessions in Python", category: "Programming", targetDate: "2026-10-15", progress: 60, completed: false },
        { id: "g2", title: "Practice Public Speaking Pitch with Priya", category: "Communication", targetDate: "2026-10-01", progress: 100, completed: true },
        { id: "g3", title: "Learn Video Editing Timeline Basics", category: "Photography", targetDate: "2026-10-25", progress: 35, completed: false }
    ],
    activities: [
        { id: "a1", date: "2026-09-22", title: "Python Loops & Functions Exchange", partner: "Rahul Sharma", skill: "Python Data Science", duration: 1.5, notes: "Covered list comprehensions and basic functions." },
        { id: "a2", date: "2026-09-20", title: "Public Speaking & Presentation Feedback", partner: "Priya Verma", skill: "Public Speaking", duration: 1.0, notes: "Practiced 3-minute speech intro." },
        { id: "a3", date: "2026-09-18", title: "HTML/CSS Layout Clinic", partner: "Priya Verma", skill: "HTML & CSS Layouts", duration: 2.0, notes: "Taught CSS Flexbox and Grid layouts to Priya." }
    ],
    badges: [
        { id: "b1", title: "First Exchange", desc: "Completed first skill exchange session", icon: "fa-rocket", unlocked: true },
        { id: "b2", title: "Streak Master", desc: "Maintained a 5-day learning streak", icon: "fa-fire", unlocked: true },
        { id: "b3", title: "Knowledge Mentor", desc: "Taught 3+ skill sessions to peers", icon: "fa-chalkboard-user", unlocked: true },
        { id: "b4", title: "Goal Crusher", desc: "Completed 5 learning goals", icon: "fa-bullseye", unlocked: false },
        { id: "b5", title: "Polymath", desc: "Learned skills across 3 categories", icon: "fa-brain", unlocked: true }
    ]
};

let appState = {};

document.addEventListener("DOMContentLoaded", () => {
    loadState();
    setupNavigation();
    renderAllSections();
});
function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            appState = JSON.parse(raw);
        } catch (e) {
            console.error("Failed to parse LocalStorage data, resetting.", e);
            appState = JSON.parse(JSON.stringify(DEFAULT_APP_DATA));
            saveState();
        }
    } else {
        appState = JSON.parse(JSON.stringify(DEFAULT_APP_DATA));
        saveState();
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    updateRawJsonSnapshot();
}

function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            navigateTo(target);
        });
    });
}

function navigateTo(targetId) {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));

    const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    const activeSection = document.getElementById(`section-${targetId}`);

    if (activeLink) activeLink.classList.add("active");
    if (activeSection) activeSection.classList.add("active");

    const titles = {
        dashboard: ["Dashboard Overview", "Welcome back! Here is your learning activity & skill match summary."],
        profile: ["My Profile & Skill Inventory", "Manage your personal details, skills offered, and skills to learn."],
        discovery: ["Skill Discovery & Matching", "Discover learning partners with complementary skills & interests."],
        goals: ["Learning Goals Tracker", "Set target dates, monitor milestones, and achieve your learning targets."],
        activities: ["Knowledge Sharing Activity Log", "Record completed learning sessions and track past history."],
        analytics: ["Analytics & Skill Growth Insights", "Track your learning consistency, category trends, and mastery metrics."],
        achievements: ["Badges & Milestones", "Earn achievements for consistent learning and knowledge sharing."],
        export: ["LocalStorage Data & Export", "View raw data and export progress reports for documentation."]
    };

    if (titles[targetId]) {
        document.getElementById("currentSectionTitle").innerText = titles[targetId][0];
        document.getElementById("currentSectionSubtitle").innerText = titles[targetId][1];
    }
}

function renderAllSections() {
    renderProfileHeader();
    renderDashboard();
    renderProfileForm();
    renderSkillsList('offer');
    renderDiscovery();
    renderGoals();
    renderActivities();
    renderAnalytics();
    renderBadges();
    updateRawJsonSnapshot();
}
function renderProfileHeader() {
    document.getElementById("sidebarUserName").innerText = appState.profile.name;
    document.getElementById("sidebarUserRole").innerText = appState.profile.role;
    document.getElementById("sidebarAvatar").src = appState.profile.avatar;
    document.getElementById("userStreakDays").innerText = appState.profile.streakDays;
}

function renderDashboard() {
    const teachSkills = appState.userSkills.filter(s => s.type === "offer");
    const learnSkills = appState.userSkills.filter(s => s.type === "learn");

    document.getElementById("statSkillsOffered").innerText = teachSkills.length;
    document.getElementById("statSkillsLearning").innerText = learnSkills.length;

    const matches = calculateMatches();
    document.getElementById("statMatchesFound").innerText = matches.length;

    const totalGoals = appState.goals.length;
    const completedGoals = appState.goals.filter(g => g.completed).length;
    const pct = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
    document.getElementById("statGoalsCompleted").innerText = `${pct}%`;

    const dashMatchesList = document.getElementById("dashMatchesList");
    dashMatchesList.innerHTML = "";

    matches.slice(0, 3).forEach(m => {
        const item = document.createElement("div");
        item.className = "partner-item";
        item.innerHTML = `
            <img src="${m.avatar}" alt="${m.name}">
            <div class="partner-info">
                <h4>${m.name} <span style="color: #f59e0b; font-size: 0.8rem;">★ ${m.rating}</span></h4>
                <p>${m.role}</p>
                <div class="tags-row">
                    <span class="tag tag-teach">Can Teach: ${m.matchedTeaches.join(", ")}</span>
                    <span class="tag tag-learn">Wants: ${m.matchedWants.join(", ")}</span>
                </div>
            </div>
            <div class="match-score">
                <span class="score-badge">${m.score}% Match</span>
            </div>
        `;
        dashMatchesList.appendChild(item);
    });

    const dashGoalsList = document.getElementById("dashGoalsList");
    dashGoalsList.innerHTML = "";
    appState.goals.slice(0, 2).forEach(g => {
        const div = document.createElement("div");
        div.style.marginBottom = "10px";
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                <span>${g.title}</span>
                <span>${g.progress}%</span>
            </div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${g.progress}%"></div></div>
        `;
        dashGoalsList.appendChild(div);
    });
    const dashActivityList = document.getElementById("dashActivityList");
    dashActivityList.innerHTML = "";
    appState.activities.slice(0, 2).forEach(a => {
        const div = document.createElement("div");
        div.style.padding = "8px 0";
        div.style.borderBottom = "1px solid #334155";
        div.style.fontSize = "0.85rem";
        div.innerHTML = `
            <strong>${a.title}</strong> with <em>${a.partner}</em>
            <div style="color: #94a3b8; font-size: 0.75rem;">${a.date} • ${a.duration} hrs</div>
        `;
        dashActivityList.appendChild(div);
    });
}

function calculateMatches() {
    const userWants = appState.userSkills.filter(s => s.type === "learn").map(s => s.name.toLowerCase());
    const userOffers = appState.userSkills.filter(s => s.type === "offer").map(s => s.name.toLowerCase());

    return appState.communityPartners.map(p => {
        let score = 50; // base match
        let matchedTeaches = [];
        let matchedWants = [];

        p.skillsOffered.forEach(so => {
            userWants.forEach(uw => {
                if (so.toLowerCase().includes(uw) || uw.includes(so.toLowerCase())) {
                    score += 25;
                    matchedTeaches.push(so);
                }
            });
        });

        p.skillsNeeded.forEach(sn => {
            userOffers.forEach(uo => {
                if (sn.toLowerCase().includes(uo) || uo.includes(sn.toLowerCase())) {
                    score += 25;
                    matchedWants.push(sn);
                }
            });
        });

        if (matchedTeaches.length === 0) matchedTeaches.push(p.skillsOffered[0] || "General Expertise");
        if (matchedWants.length === 0) matchedWants.push(p.skillsNeeded[0] || "General Interest");

        score = Math.min(score, 98);

        return {
            ...p,
            score,
            matchedTeaches,
            matchedWants,
            isMutual: matchedTeaches.length > 0 && matchedWants.length > 0
        };
    }).sort((a, b) => b.score - a.score);
}

function renderProfileForm() {
    document.getElementById("profileName").value = appState.profile.name;
    document.getElementById("profileRole").value = appState.profile.role;
    document.getElementById("profileInstitution").value = appState.profile.institution;
    document.getElementById("profileBio").value = appState.profile.bio;
    document.getElementById("profileAvatar").value = appState.profile.avatar;

    const offerCount = appState.userSkills.filter(s => s.type === "offer").length;
    const learnCount = appState.userSkills.filter(s => s.type === "learn").length;
    document.getElementById("teachCount").innerText = offerCount;
    document.getElementById("learnCount").innerText = learnCount;
}

function saveProfile(e) {
    e.preventDefault();
    appState.profile.name = document.getElementById("profileName").value;
    appState.profile.role = document.getElementById("profileRole").value;
    appState.profile.institution = document.getElementById("profileInstitution").value;
    appState.profile.bio = document.getElementById("profileBio").value;
    appState.profile.avatar = document.getElementById("profileAvatar").value;

    saveState();
    renderProfileHeader();
    alert("Profile details updated successfully!");
}

let activeSkillTab = 'offer';
function switchSkillTab(tabType, element) {
    activeSkillTab = tabType;
    document.querySelectorAll(".skills-tab-header .tab-btn").forEach(b => b.classList.remove("active"));
    element.classList.add("active");
    renderSkillsList(tabType);
}

function renderSkillsList(tabType = activeSkillTab) {
    const container = document.getElementById("skillsListContainer");
    container.innerHTML = "";

    const filtered = appState.userSkills.filter(s => s.type === tabType);
    if (filtered.length === 0) {
        container.innerHTML = `<p style="color: #94a3b8; font-size: 0.9rem;">No skills listed in this tab.</p>`;
        return;
    }

    filtered.forEach(s => {
        const row = document.createElement("div");
        row.className = "skill-row";
        row.innerHTML = `
            <div class="skill-info">
                <h5>${s.name}</h5>
                <span>Category: ${s.category} • Level: ${s.level}</span>
            </div>
            <button class="btn btn-sm btn-danger" onclick="deleteSkill('${s.id}')"><i class="fa-solid fa-trash"></i></button>
        `;
        container.appendChild(row);
    });
}

function deleteSkill(skillId) {
    appState.userSkills = appState.userSkills.filter(s => s.id !== skillId);
    saveState();
    renderProfileForm();
    renderSkillsList();
    renderDashboard();
}

function addSkillSubmit(e) {
    e.preventDefault();
    const newSkill = {
        id: "s_" + Date.now(),
        name: document.getElementById("skillName").value,
        category: document.getElementById("skillCategory").value,
        type: document.getElementById("skillType").value,
        level: document.getElementById("skillLevel").value
    };

    appState.userSkills.push(newSkill);
    saveState();
    closeModal("addSkillModal");
    renderProfileForm();
    renderSkillsList();
    renderDashboard();
}

function renderDiscovery() {
    const grid = document.getElementById("discoveryGrid");
    grid.innerHTML = "";

    const matches = calculateMatches();
    const keyword = (document.getElementById("searchKeyword") ? document.getElementById("searchKeyword").value : "").toLowerCase();
    const category = document.getElementById("categoryFilter") ? document.getElementById("categoryFilter").value : "ALL";
    const matchFilter = document.getElementById("matchFilter") ? document.getElementById("matchFilter").value : "ALL";

    const filtered = matches.filter(m => {
        const matchesKey = m.name.toLowerCase().includes(keyword) || m.skillsOffered.some(so => so.toLowerCase().includes(keyword));
        const matchesCat = category === "ALL" || m.skillsOffered.some(so => so.includes(category));
        const matchesFilter = matchFilter === "ALL" || (matchFilter === "HIGH_MATCH" && m.score >= 70) || (matchFilter === "MUTUAL" && m.isMutual);
        return matchesKey && matchesCat && matchesFilter;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="color: #94a3b8; grid-column: 1/-1;">No matching skill partners found for your search criteria.</p>`;
        return;
    }

    filtered.forEach(m => {
        const card = document.createElement("div");
        card.className = "user-card";
        card.innerHTML = `
            <div class="user-card-header">
                <img src="${m.avatar}" alt="${m.name}">
                <div>
                    <h4>${m.name}</h4>
                    <p>${m.role} • ${m.institution}</p>
                </div>
            </div>

            <div class="user-skills-section">
                <h6>Skills Offered:</h6>
                <div class="tags-row">
                    ${m.skillsOffered.map(so => `<span class="tag tag-teach">${so}</span>`).join("")}
                </div>
            </div>

            <div class="user-skills-section">
                <h6>Skills Wanting to Learn:</h6>
                <div class="tags-row">
                    ${m.skillsNeeded.map(sn => `<span class="tag tag-learn">${sn}</span>`).join("")}
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 15px; border-top: 1px solid #334155; padding-top: 12px;">
                <span class="score-badge">${m.score}% Match</span>
                <button class="btn btn-sm btn-primary" onclick="alert('Connect Request sent to ${m.name}! They will receive a notification to schedule a session.')"><i class="fa-solid fa-comments"></i> Connect</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterDiscovery() {
    renderDiscovery();
}

function renderGoals() {
    const container = document.getElementById("goalsContainer");
    container.innerHTML = "";

    if (appState.goals.length === 0) {
        container.innerHTML = `<p style="color: #94a3b8;">No active goals yet. Click 'New Goal' to set one!</p>`;
        return;
    }

    appState.goals.forEach(g => {
        const card = document.createElement("div");
        card.className = "goal-card";
        card.innerHTML = `
            <div class="goal-header">
                <h4>${g.title}</h4>
                <button class="btn btn-sm ${g.completed ? 'btn-secondary' : 'btn-primary'}" onclick="toggleGoalComplete('${g.id}')">
                    ${g.completed ? '<i class="fa-solid fa-check-double"></i> Done' : 'Mark Done'}
                </button>
            </div>
            <p style="font-size:0.8rem; color:#94a3b8;">Category: ${g.category} • Target Date: ${g.targetDate}</p>
            
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${g.progress}%;"></div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.8rem;">Progress: ${g.progress}%</span>
                <input type="range" min="0" max="100" value="${g.progress}" onchange="updateGoalProgress('${g.id}', this.value)">
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleGoalComplete(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (goal) {
        goal.completed = !goal.completed;
        goal.progress = goal.completed ? 100 : 50;
        saveState();
        renderGoals();
        renderDashboard();
    }
}

function updateGoalProgress(goalId, val) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (goal) {
        goal.progress = parseInt(val);
        goal.completed = goal.progress === 100;
        saveState();
        renderGoals();
        renderDashboard();
    }
}

function addGoalSubmit(e) {
    e.preventDefault();
    const newGoal = {
        id: "g_" + Date.now(),
        title: document.getElementById("goalTitle").value,
        category: document.getElementById("goalCategory").value,
        targetDate: document.getElementById("goalDate").value,
        progress: 0,
        completed: false
    };

    appState.goals.push(newGoal);
    saveState();
    closeModal("addGoalModal");
    renderGoals();
    renderDashboard();
}
function renderActivities() {
    const tbody = document.getElementById("activityTableBody");
    tbody.innerHTML = "";

    appState.activities.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${a.date}</td>
            <td><strong>${a.title}</strong></td>
            <td>${a.partner}</td>
            <td><span class="tag tag-teach">${a.skill}</span></td>
            <td>${a.duration} hrs</td>
            <td>${a.notes}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteActivity('${a.id}')"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function addActivitySubmit(e) {
    e.preventDefault();
    const newAct = {
        id: "a_" + Date.now(),
        date: document.getElementById("actDate").value,
        title: document.getElementById("actTitle").value,
        partner: document.getElementById("actPartner").value,
        skill: document.getElementById("actSkill").value,
        duration: parseFloat(document.getElementById("actDuration").value),
        notes: document.getElementById("actNotes").value
    };

    appState.activities.unshift(newAct);
    appState.profile.streakDays += 1; // Increase streak
    saveState();
    closeModal("addActivityModal");
    renderActivities();
    renderDashboard();
    renderProfileHeader();
}

function deleteActivity(actId) {
    appState.activities = appState.activities.filter(a => a.id !== actId);
    saveState();
    renderActivities();
    renderDashboard();
}

function renderAnalytics() {
    const list = document.getElementById("categoryBreakdownList");
    list.innerHTML = "";

    const categories = ["Programming", "Design", "Business", "Communication", "Photography"];
    categories.forEach(cat => {
        const count = appState.userSkills.filter(s => s.category === cat).length;
        const total = appState.userSkills.length || 1;
        const pct = Math.round((count / total) * 100);

        const div = document.createElement("div");
        div.className = "cat-row";
        div.innerHTML = `
            <label><span>${cat}</span> <span>${count} Skills (${pct}%)</span></label>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        `;
        list.appendChild(div);
    });

    const totalHours = appState.activities.reduce((acc, a) => acc + (a.duration || 0), 0);
    document.getElementById("metricStreak").innerText = `${appState.profile.streakDays} Days`;
    document.getElementById("metricTotalHours").innerText = `${totalHours} hrs`;
    document.getElementById("metricMasteryScore").innerText = `${Math.min(65 + appState.activities.length * 3, 98)} / 100`;
}

function renderBadges() {
    const grid = document.getElementById("badgesGrid");
    grid.innerHTML = "";

    appState.badges.forEach(b => {
        const card = document.createElement("div");
        card.className = `badge-card ${b.unlocked ? '' : 'badge-locked'}`;
        card.innerHTML = `
            <div class="badge-icon bg-purple">
                <i class="fa-solid ${b.icon}"></i>
            </div>
            <h4>${b.title}</h4>
            <p style="font-size:0.8rem; color:#94a3b8;">${b.desc}</p>
            <span class="tag ${b.unlocked ? 'tag-teach' : 'tag-learn'}" style="margin-top:10px; display:inline-block;">
                ${b.unlocked ? 'Unlocked' : 'Locked'}
            </span>
        `;
        grid.appendChild(card);
    });
}

function updateRawJsonSnapshot() {
    const el = document.getElementById("jsonRawOutput");
    if (el) {
        el.value = JSON.stringify(appState, null, 2);
    }
}

function exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "SkillSwap_UserData_Backup.json");
    dlAnchorElem.click();
}

function exportReportText() {
    let report = `========================================================\n`;
    report += `   SKILLSWAP COMMUNITY LEARNING NETWORK - USER REPORT   \n`;
    report += `========================================================\n\n`;
    report += `Student Name: ${appState.profile.name}\n`;
    report += `Role / Institution: ${appState.profile.role} (${appState.profile.institution})\n`;
    report += `Active Streak: ${appState.profile.streakDays} Days\n\n`;
    report += `--- SKILLS OFFERED --- \n`;
    appState.userSkills.filter(s=>s.type==='offer').forEach(s => {
        report += ` - ${s.name} [${s.category}] - ${s.level}\n`;
    });
    report += `\n--- SKILLS LEARNING --- \n`;
    appState.userSkills.filter(s=>s.type==='learn').forEach(s => {
        report += ` - ${s.name} [${s.category}] - ${s.level}\n`;
    });
    report += `\n--- ACTIVE GOALS --- \n`;
    appState.goals.forEach(g => {
        report += ` - ${g.title} (${g.progress}% Complete) [Target: ${g.targetDate}]\n`;
    });
    report += `\n--- RECENT ACTIVITY SESSIONS --- \n`;
    appState.activities.forEach(a => {
        report += ` - ${a.date}: ${a.title} with ${a.partner} (${a.duration} hrs)\n`;
    });

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(report);
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "SkillSwap_Learning_Report.txt");
    dlAnchorElem.click();
}

function resetToDefaultData() {
    if (confirm("Are you sure you want to reset all data back to original sample data?")) {
        appState = JSON.parse(JSON.stringify(DEFAULT_APP_DATA));
        saveState();
        renderAllSections();
        alert("Data reset successfully!");
    }
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
}
