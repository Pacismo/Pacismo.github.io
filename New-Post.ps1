# Code by Francisco Santana (https://franciscosp.com).
# This file is meant to add a new post by creating a properly-formatted markdown file (with metadata).
# You are free to copy this code, so long as proper attribution is provided.

param(
	[Parameter(Mandatory = $true, Position = 0)]
	[String] $Title,
	[Parameter(Mandatory = $false, Position = 1)]
	[String[]] $Categories = "",
	[Parameter(Mandatory = $false, Position = 2)]
	[String[]] $Tags = ""
)
function New-Post {
	[CmdletBinding()]
	param (
		[Parameter(Mandatory = $true, Position = 0)]
		[String] $Title,
		[Parameter(Mandatory = $false)]
		[String[]] $Categories = "",
		[Parameter(Mandatory = $false)]
		[String[]] $Tags = ""
	)
	
	begin {

	}
	
	process {
		$time = (Get-Date -Format "hh-mm-ss K").replace(":", "").replace("-", ":")
		$date = Get-Date -Format "yyyy-MM-DD"

		$content = "---`r`nlayout: post`r`ntitle: $Title`r`ndate: $date $time"
		if ($Categories.Length -gt 0) {
			$content = $content + "`r`ncategories:"
			foreach ($item in $Categories) {
				$item = $item.replace(" ", "-")
				$content = $content + " $item"
			}
		}
		else {
			$content = $content + "`r`n# categories: # Add categories here!"
		}
		if ($Tags.Length -gt 0) {
			$content = $content + "`r`ntags:"
			foreach ($item in $Tags) {
				$item = $item.replace(" ", "-")
				$content = $content + " $item"
			}
		}
		else {
			$content = $content + "`r`n# tags # Add tags here!"
		}
		$content = $content + "`r`n# Add content below the line!`r`n---`r`n"

		$file = "./_posts/$date-" + $Title.replace(" ", "-") + ".md"

		New-Item -Path $file
		Add-Content -Path $file -Value $content

		Write-Host "Successfully created a new blog post in $file.`n`tOpen it and modify its contents!"
	}
	
	end {
		
	}
}

New-Post -Title $Title -Categories $Categories -Tags $Tags