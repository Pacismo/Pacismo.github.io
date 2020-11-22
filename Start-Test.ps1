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