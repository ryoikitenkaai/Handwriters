<?php
// Start session and check authentication
session_start();

// Set your password here - CHANGE THIS to something secure
$correct_password = "chotu";

// Check if user is logged in
if (!isset($_SESSION['crm_logged_in']) || $_SESSION['crm_logged_in'] !== true) {
    // Check if password was submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
        if ($_POST['password'] === $correct_password) {
            $_SESSION['crm_logged_in'] = true;

            // Continue to show the CRM
        } else {
            $error = "Invalid password";
            showLoginForm($error);
            exit();
        }
    } else {
        showLoginForm();
        exit();
    }
}

// If logged in, show the CRM content
function showLoginForm($error = "") {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Handwriters Publication - CRM Login</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
            body { background: #f5f5f5; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .login-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
            h1 { text-align: center; margin-bottom: 20px; color: #2c3e50; }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 5px; font-weight: 500; }
            input[type="password"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
            button { width: 100%; padding: 12px; background: #2c3e50; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
            button:hover { background: #1a2530; }
            .error { color: #e74c3c; text-align: center; margin-top: 15px; }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h1>CRM Login</h1>
            <form method="POST">
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Login</button>
                <?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>
            </form>
        </div>
    </body>
    </html>
    <?php
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Handwriters Publication - Submissions CRM</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif;
        }

        body {
            background: #f5f5f5;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        header {
            background: #2c3e50;
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        h1 {
            font-size: 18px;
            font-weight: 500;
        }

        .back-btn {
            color: white;
            text-decoration: none;
            padding: 5px 10px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 4px;
        }

        .controls {
            padding: 15px 20px;
            background: #f9f9f9;
            border-bottom: 1px solid #eee;
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }

        .search-box {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 250px;
        }

        .filter-select {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
        }

        .refresh-btn {
            padding: 8px 15px;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .table-container {
            overflow-x: auto;
        }

        .submissions-table {
            width: 100%;
            border-collapse: collapse;
        }

        .submissions-table th {
            background: #f2f2f2;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            cursor: pointer;
            position: sticky;
            top: 0;
        }

        .submissions-table th:hover {
            background: #e5e5e5;
        }

        .submissions-table th i {
            margin-left: 5px;
            opacity: 0.5;
        }

        .submissions-table td {
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
        }

        .submissions-table tr:hover {
            background: #f9f9f9;
        }

        .pagination {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f9f9f9;
            border-top: 1px solid #eee;
        }

        .entries-info {
            color: #666;
        }

        .pagination-controls {
            display: flex;
            gap: 10px;
        }

        .pagination-btn {
            padding: 5px 10px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 4px;
            cursor: pointer;
        }

        .pagination-btn.active {
            background: #2c3e50;
            color: white;
            border-color: #2c3e50;
        }

        .empty-state {
            padding: 40px;
            text-align: center;
            color: #666;
        }

        /* WhatsApp button styles (added) */
        .whatsapp-btn {
            padding: 6px 10px;
            background: #25D366;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 12px;
            margin: 2px;
            text-align: center;
            white-space: nowrap;
        }

        .whatsapp-btn:hover {
            background: #128C7E;
        }

        .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 5px;
            min-width: 160px;
        }

        @media (max-width: 768px) {
            .controls {
                flex-direction: column;
            }

            .search-box {
                width: 100%;
            }

            .action-buttons {
                flex-direction: row;
                flex-wrap: wrap;
            }

            .whatsapp-btn {
                font-size: 11px;
                padding: 4px 8px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <header>
            <h1>Handwriters Publication - Submissions Manager</h1>
            <a href="index.html" class="back-btn">Back to Form</a>
            <a href="?logout=true" class="back-btn" style="margin-left: 10px;">Logout</a>
        </header>

        <div class="controls">
            <input type="text" id="searchInput" class="search-box" placeholder="Search by name or email..." onkeyup="filterTable()">
            <select id="indexingFilter" class="filter-select" onchange="filterTable()">
                <option value="">All Indexing Types</option>
                <option value="scopus">Scopus</option>
                <option value="web-of-science">Web of Science</option>
                <option value="abdc">ABDC</option>
                <option value="google-scholar">Google Scholar</option>
                <option value="others">Others</option>
            </select>
            <button onclick="loadSubmissions()" class="refresh-btn">Refresh</button>
        </div>

        <div class="table-container">
            <table class="submissions-table" id="submissionsTable">
                <thead>
                    <tr>
                        <th onclick="sortTable(0)">ID <i>↕</i></th>
                        <th onclick="sortTable(1)">Name <i>↕</i></th>
                        <th onclick="sortTable(2)">Email <i>↕</i></th>
                        <th onclick="sortTable(3)">WhatsApp <i>↕</i></th>
                        <th onclick="sortTable(4)">Subject Area <i>↕</i></th>
                        <th onclick="sortTable(5)">Indexing <i>↕</i></th>
                        <th onclick="sortTable(6)">Submission Date <i>↕</i></th>
                        <!-- New column for WhatsApp actions (not sortable) -->
                        <th>WhatsApp Messages</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <!-- Data will be loaded here -->
                </tbody>
            </table>
        </div>

        <div class="empty-state" id="emptyState" style="display: none;">
            No submissions found. Try adjusting your search or filters.
        </div>

        <div class="pagination">
            <div class="entries-info" id="entriesInfo">Showing 0 entries</div>
            <div class="pagination-controls" id="paginationControls">
                <button class="pagination-btn" onclick="changePage('prev')">Previous</button>
                <button class="pagination-btn" onclick="changePage('next')">Next</button>
            </div>
        </div>
    </div>

    <script>
        let allSubmissions = [];
        let currentPage = 1;
        const rowsPerPage = 20;
        let sortColumn = 6; // Default sort by date (most recent first)
        let sortDirection = 'desc';

        // Load submissions when page loads
        window.onload = function() {
            loadSubmissions();
        };

        // Load data from server
        function loadSubmissions() {
            fetch('get_submissions.php')
                .then(response => response.json())
                .then(data => {
                    allSubmissions = data;
                    sortData(sortColumn, sortDirection);
                    currentPage = 1;
                    renderTable();
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('tableBody').innerHTML = 
                        '<tr><td colspan="8" style="text-align: center; color: #666; padding: 20px;">Error loading data. Please try again.</td></tr>';
                });
        }

        // Sort data
        function sortData(column, direction) {
            allSubmissions.sort((a, b) => {
                let valueA = a[column];
                let valueB = b[column];
                
                // Special handling for date column
                if (column === 6) {
                    valueA = new Date(valueA);
                    valueB = new Date(valueB);
                }
                
                if (valueA < valueB) return direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // Render table with current data
        function renderTable() {
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            const pageData = allSubmissions.slice(startIndex, endIndex);
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');
            
            if (pageData.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
                document.getElementById('entriesInfo').textContent = 'Showing 0 entries';
                return;
            }
            
            emptyState.style.display = 'none';
            let tableHTML = '';
            
            pageData.forEach(row => {
                // row indices (unchanged): 
                // 0: ID, 1: Name, 2: Email, 3: WhatsApp, 4: Subject, 5: Indexing, 6: Date
                const id = row[0];
                const name = row[1];
                const email = row[2];
                const whatsapp = (row[3] || '').toString().replace(/\D/g, ''); // sanitize to digits
                const subject = row[4] || '';
                const indexing = row[5] || '';
                const dateRaw = row[6];

                // WhatsApp message templates
                const msgThanks = encodeURIComponent(`Hello ${name}! Thank you for submitting your research on '${subject}'. We've received it and will begin our review process. We'll contact you within 3–5 business days.`);
                const msgInfo = encodeURIComponent(`Hi ${name}! We're reviewing your submission on '${subject}' and need some additional information. Could you please provide more details about your methodology?`);
                const msgUpdate = encodeURIComponent(`Dear ${name}, this is an update regarding your submission on '${subject}'. Our review is progressing well. We'll have a decision for you shortly.`);

                const waBase = `https://wa.me/91${whatsapp}?text=`;

                tableHTML += `
                    <tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${email}</td>
                        <td>${row[3]}</td>
                        <td>${subject}</td>
                        <td>${indexing}</td>
                        <td>${formatDate(dateRaw)}</td>
                        <td>
                            <div class="action-buttons">
                                <a href="${waBase}${msgThanks}" class="whatsapp-btn" target="_blank" rel="noopener">Thank You</a>
                                <a href="${waBase}${msgInfo}" class="whatsapp-btn" target="_blank" rel="noopener">Request Info</a>
                                <a href="${waBase}${msgUpdate}" class="whatsapp-btn" target="_blank" rel="noopener">Send Update</a>
                            </div>
                        </td>
                    </tr>
                `;
            });
            
            tableBody.innerHTML = tableHTML;
            updatePagination();
        }

        // Format date for display
        function formatDate(dateString) {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString; // if not parseable, return as-is
            return date.toLocaleString();
        }

        // Update pagination controls
        function updatePagination() {
            const totalPages = Math.ceil(allSubmissions.length / rowsPerPage);
            const startEntry = (currentPage - 1) * rowsPerPage + 1;
            const endEntry = Math.min(currentPage * rowsPerPage, allSubmissions.length);
            
            document.getElementById('entriesInfo').textContent = 
                `Showing ${startEntry} to ${endEntry} of ${allSubmissions.length} entries`;
        }

        // Change page
        function changePage(direction) {
            const totalPages = Math.ceil(allSubmissions.length / rowsPerPage);
            
            if (direction === 'next' && currentPage < totalPages) {
                currentPage++;
            } else if (direction === 'prev' && currentPage > 1) {
                currentPage--;
            }
            
            renderTable();
        }

        // Sort table
        function sortTable(column) {
            // Update sort direction
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            
            // Sort and render
            sortData(column, sortDirection);
            currentPage = 1;
            renderTable();
            
            // Update UI indicators
            document.querySelectorAll('th i').forEach(icon => {
                icon.textContent = '↕';
            });
            
            const currentHeader = document.querySelectorAll('th')[column];
            if (currentHeader && currentHeader.querySelector('i')) {
                currentHeader.querySelector('i').textContent = sortDirection === 'asc' ? '↑' : '↓';
            }
        }

        // Filter table based on search and filters (unchanged)
        function filterTable() {
            const searchText = document.getElementById('searchInput').value.toLowerCase();
            const indexingFilter = document.getElementById('indexingFilter').value;
            
            fetch('get_submissions.php')
                .then(response => response.json())
                .then(data => {
                    allSubmissions = data.filter(submission => {
                        const matchesSearch = submission[1].toLowerCase().includes(searchText) || 
                                            submission[2].toLowerCase().includes(searchText);
                        const matchesFilter = !indexingFilter || submission[5] === indexingFilter;
                        return matchesSearch && matchesFilter;
                    });
                    
                    sortData(sortColumn, sortDirection);
                    currentPage = 1;
                    renderTable();
                });
        }
    </script>
</body>

</html>

<?php
// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: crm.php");
    exit();
}
?>
