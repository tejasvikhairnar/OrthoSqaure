# TODO: Fix Axios Error Response Logging

## Steps to Complete
- [x] Update errorDetails object in src/lib/axiosClient.js to include fallback values for undefined properties (e.g., status: error.response.status || 'unknown')
- [x] Test the doctor API call to ensure error handling works without logging empty objects
- [x] Verify the fix resolves the console error at line 51
