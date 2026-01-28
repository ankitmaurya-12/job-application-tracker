import connectDB from "@/lib/db"; 
import '@/lib/models';
import { Board, Column, JobApplication } from '@/lib/models';

const USER_ID = "697297a2034800d118369b63"; // replace with actual user id

const SAMPLE_JOBS = [
  {
    company: "Google",
    position: "Software Engineer",
    location: "Mountain View, CA",
    status: "wishlist",
    notes: "Great company culture",
    salary: "120000",
    jobUrl: "https://careers.google.com/jobs/results/123456-software-engineer/",
    tags: ["tech", "full-time"],
    description: "Work on cutting-edge technology at Google.",
  },
  {
    company: "Amazon",
    position: "Backend Developer",
    location: "Seattle, WA",
    status: "wishlist",
    notes: "Interested in cloud computing",
    salary: "110000",
    jobUrl: "https://www.amazon.jobs/en/jobs/654321-backend-developer/",
    tags: ["e-commerce", "full-time"],
    description: "Build scalable backend systems for Amazon.",
  },
  {
    company: "Microsoft",
    position: "Frontend Developer",
    location: "Redmond, WA",
    status: "applied",
    notes: "Applied via referral",
    salary: "115000",
    jobUrl: "https://careers.microsoft.com/us/en/job/789012-frontend-developer/",
    tags: ["tech", "full-time"],
    description: "Develop user-friendly web applications at Microsoft.",
  },
  {
    company: "Facebook",
    position: "Full Stack Developer",
    location: "Menlo Park, CA",
    status: "interviewing",
    notes: "Interview scheduled for next week",
    salary: "125000",
    jobUrl: "https://www.facebookcareers.com/jobs/345678-full-stack-developer/",
    tags: ["social media", "full-time"],
    description: "Work on innovative social media platforms at Facebook.",
  },
  {
    company: "Apple",
    position: "iOS Developer",
    location: "Cupertino, CA",
    status: "interviewing",
    notes: "Excited about the opportunity",
    salary: "130000",
    jobUrl: "https://jobs.apple.com/en-us/details/901234-ios-developer/",
    tags: ["tech", "full-time"],
    description: "Create amazing iOS applications at Apple.",
  },
  {
    company: "Netflix",
    position: "DevOps Engineer",
    location: "Los Gatos, CA",
    status: "interviewing",
    notes: "Preparing for technical interview",
    salary: "140000",
    jobUrl: "https://jobs.netflix.com/jobs/567890-devops-engineer/",
    tags: ["entertainment", "full-time"],
    description: "Maintain and improve Netflix's infrastructure.",
  },
  {
    company: "Deloitte",
    position: "Data Analyst",
    location: "New York, NY",
    status: "offer",
    notes: "Received offer, considering options",
    salary: "90000",
    jobUrl: "https://www2.deloitte.com/us/en/careers/job-search.html?jobId=123456-data-analyst/",
    tags: ["consulting", "full-time"],
    description: "Analyze data to drive business decisions at Deloitte.",
  },
  {
    company: "Accenture",
    position: "IT Consultant",
    location: "Chicago, IL",
    status: "offer",
    notes: "Offer accepted",
    salary: "95000",
    jobUrl: "https://www.accenture.com/us-en/careers/jobdetails?id=654321-it-consultant/",
    tags: ["consulting", "full-time"],
    description: "Provide IT consulting services at Accenture.",
  },
  {
    company: "PwC",
    position: "Business Analyst",
    location: "Boston, MA",
    status: "offer",
    notes: "Negotiating salary",
    salary: "92000",
    jobUrl: "https://www.pwc.com/us/en/careers/job-search.html?jobId=789012-business-analyst/",
    tags: ["consulting", "full-time"],
    description: "Help businesses improve their processes at PwC.",
  },
  {
    company: "KPMG",
    position: "Financial Analyst",
    location: "San Francisco, CA",
    status: "offer",
    notes: "Excited to join the team",
    salary: "88000",
    jobUrl: "https://home.kpmg/xx/en/home/careers/job-search.html?jobId=345678-financial-analyst/",
    tags: ["consulting", "full-time"],
    description: "Analyze financial data to support business decisions at KPMG.",
  },
  {
    company: "IBM",
    position: "Systems Engineer",
    location: "Armonk, NY",
    status: "rejected",
    notes: "Received rejection email",
    salary: "105000",
    jobUrl: "https://www.ibm.com/employment/us-en/search/?jobId=901234-systems-engineer/",
    tags: ["tech", "full-time"],
    description: "Design and implement systems solutions at IBM.",
  },
  {
    company: "Oracle",
    position: "Database Administrator",
    location: "Redwood City, CA",
    status: "rejected",
    notes: "Interviewed but not selected",
    salary: "115000",
    jobUrl: "https://www.oracle.com/corporate/careers/job-search.html?jobId=567890-database-administrator/",
    tags: ["tech", "full-time"],
    description: "Manage and maintain Oracle databases.",
  }
];

async function seed() {
  if (!USER_ID) {
    console.error("❌ ERROR: SEED_USER_ID variable is required");
    console.log("Usage: SEED_USER_ID=your_user_id npm run seed");
    process.exit(1);
  }

  try {
    console.log("🔌 Starting seed process...");
    console.log(`🧾 Seeding data for user ID: ${USER_ID}`);

    await connectDB();
    console.log("✅ Connected to database");

    // Find the user's board 
    let board = await Board.findOne({ userId: USER_ID, name: "Job Hunt" });

    if (!board) {
      console.log("⚠️ Board not found. Creating a new board...");
      const { initializeUserBoard } = await import("../lib/init-user-board");
      board = await initializeUserBoard(USER_ID);
      console.log("✅ Created new board for user");
    } else {
      console.log("✅ Found existing board for user");
    }

    // Get All Columns
    const columns = await Column.find({ boardId: board._id }).sort({ order: 1 });

    console.log(`🧱 Found ${columns.length} columns in the board`);

    if (columns.length === 0) {
      console.error("⚠️ No columns found. Please ensure the board has default columns.");
      process.exit(1);
    }

    // Map column name to the column IDs
    const columnMap: Record<string, string> = {};
    columns.forEach((col) => {
      columnMap[col.name.toLowerCase()] = col._id.toString();
    });

    // Clear existing job applications for this user
    const existingJobs = await JobApplication.find({ userId: USER_ID });
    if (existingJobs.length > 0) {
      console.log(`🧹 Clearing ${existingJobs.length} existing job applications...`);
      await JobApplication.deleteMany({ userId: USER_ID });
      console.log("✅ Cleared existing job applications");

      // Clear job applications from columns
      for (const column of columns) {
        column.jobApplications = [];
        await column.save();
      }
    }

    // Distribute jobs across columns
    const jobsByColumn: Record<string, typeof SAMPLE_JOBS> = {
      "wish list": SAMPLE_JOBS.filter((job) => job.status === "wishlist"),
      "applied": SAMPLE_JOBS.filter((job) => job.status === "applied"),
      "interviewing": SAMPLE_JOBS.filter((job) => job.status === "interviewing"),
      "offers": SAMPLE_JOBS.filter((job) => job.status === "offer"),
      "rejected": SAMPLE_JOBS.filter((job) => job.status === "rejected"),
    };

    let totalJobsAdded = 0;

    for (const [columnName, jobs] of Object.entries(jobsByColumn)) {
      const columnId = columnMap[columnName.toLowerCase()];
      if (!columnId) {
        console.warn(`⚠️ Column "${columnName}" not found in board. Skipping...`);
        continue;
      }

      console.log(`➕ Adding ${jobs.length} jobs to column "${columnName}"`);

      const column = columns.find((c) => c.name.toLowerCase() === columnName);
      if (!column) {
        console.warn(`⚠️ Column "${columnName}" not found in board. Skipping...`);
        continue;
      }

      for (let i = 0; i < jobs.length; i++) {
        const jobData = jobs[i];
        const jobApplication = await JobApplication.create({
          company: jobData.company,
          position: jobData.position,
          location: jobData.location,
          notes: jobData.notes,
          salary: jobData.salary,
          jobUrl: jobData.jobUrl,
          tags: jobData.tags,
          description: jobData.description,
          columnId: columnId,
          boardId: board._id,
          userId: USER_ID,
          status: "applied",
          order: i,
        });

        column.jobApplications.push(jobApplication._id);
        totalJobsAdded++;
      }
      
      await column.save();
      console.log(`✅ Added ${jobs.length} jobs to column "${columnName}"`);
    }

    console.log(`🎉 Seed process completed! Total job applications added: ${totalJobsAdded}`);
    console.log(`🗒️ Board: ${board.name}`);
    console.log(`👤 User ID: ${USER_ID}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR during seed process:", error);
    process.exit(1);
  }
}

seed();
