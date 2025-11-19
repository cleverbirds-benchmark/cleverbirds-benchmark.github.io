/**
 * Weekly visitor report email sender
 * 
 * This script fetches visit statistics from Supabase and sends a weekly email report.
 * Run this via GitHub Actions scheduled workflow or a cron job.
 * 
 * Required environment variables:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_SERVICE_KEY: Your Supabase service role key
 * - RESEND_API_KEY: Your Resend API key
 * - REPORT_EMAIL_TO: Email address to send reports to
 * - REPORT_EMAIL_FROM: Email address to send reports from (must be verified in Resend)
 */

const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

// Initialize clients (will be set from environment variables)
let supabase = null;
let resend = null;

async function sendWeeklyReport() {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate date range (last 7 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    // Get visit statistics
    const { data: visits, error: visitsError } = await supabase
      .from('visits')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (visitsError) {
      throw new Error(`Failed to fetch visits: ${visitsError.message}`);
    }

    // Calculate statistics
    const totalVisits = visits?.length || 0;
    const uniqueVisits = new Set(visits?.map(v => v.path) || []).size;
    
    // Group by date
    const visitsByDate = {};
    visits?.forEach(visit => {
      const date = new Date(visit.created_at).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      visitsByDate[date] = (visitsByDate[date] || 0) + 1;
    });

    // Get total all-time visits
    const { count: totalAllTime } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true });

    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .stat { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #4CAF50; }
            .stat-label { font-size: 14px; color: #666; margin-bottom: 5px; }
            .stat-value { font-size: 24px; font-weight: bold; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #4CAF50; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐦 CleverBirds Weekly Visitor Report</h1>
            </div>
            <div class="content">
              <p>Here's your weekly visitor statistics for CleverBirds:</p>
              
              <div class="stat">
                <div class="stat-label">Total Visits (Last 7 Days)</div>
                <div class="stat-value">${totalVisits}</div>
              </div>
              
              <div class="stat">
                <div class="stat-label">Unique Pages Visited</div>
                <div class="stat-value">${uniqueVisits}</div>
              </div>
              
              <div class="stat">
                <div class="stat-label">All-Time Total Visits</div>
                <div class="stat-value">${totalAllTime || 0}</div>
              </div>

              ${Object.keys(visitsByDate).length > 0 ? `
                <h3>Daily Breakdown</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Visits</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${Object.entries(visitsByDate)
                      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                      .map(([date, count]) => `
                        <tr>
                          <td>${date}</td>
                          <td>${count}</td>
                        </tr>
                      `).join('')}
                  </tbody>
                </table>
              ` : '<p>No visits recorded this week.</p>'}
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Report generated on ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.REPORT_EMAIL_TO;
    const emailFrom = process.env.REPORT_EMAIL_FROM || 'noreply@yourdomain.com';

    if (!resendApiKey || !emailTo) {
      throw new Error('Missing email configuration');
    }

    resend = new Resend(resendApiKey);

    const { data, error: emailError } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `CleverBirds Weekly Report - ${totalVisits} visits this week`,
      html: emailHtml,
    });

    if (emailError) {
      throw new Error(`Failed to send email: ${emailError.message}`);
    }

    console.log('Weekly report sent successfully:', data);
    return { success: true, totalVisits, totalAllTime };
  } catch (error) {
    console.error('Error sending weekly report:', error);
    throw error;
  }
}

// If running as a script directly
if (require.main === module) {
  sendWeeklyReport()
    .then(result => {
      console.log('Report sent:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('Failed to send report:', error);
      process.exit(1);
    });
}

module.exports = { sendWeeklyReport };

