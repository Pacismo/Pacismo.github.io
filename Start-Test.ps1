# Code by Francisco Santana (https://franciscosp.com).
# This file is meant to begin a localhost server running your site (which also builds the site itself).
# This server also updates live as you change your contents. There is no need to close the server to rebuild!
# You are free to copy this code, so long as proper attribution is provided.
function Start-Test {
	[CmdletBinding()]
	param (
		
	)
	
	begin {
		
	}
	
	process {
		bundle exec jekyll serve
	}
	
	end {
		
	}
}

Write-Host "Running Jekyll localhost server..."
Start-Test