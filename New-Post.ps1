param([Parameter(Mandatory = $true, Position = 0)][String]$Title, [Parameter(Mandatory = $false, Position = 1)][String[]]$Categories)
function New-Post {
	[CmdletBinding()]
	param (
		[Parameter(Mandatory = $true, Position = 0)]
		[String] $Title,
		[Parameter(Mandatory = $false)]
		[Switch] $AddCategories 
	)
	
	begin {

	}
	
	process {
		$time = (Get-Date -Format "hh-mm-ss K").replace(":", "").replace("-", ":")
		$date = Get-Date -Format "yyyy-mm-dd"

		$content = "---`r`nlayout: page`r`ntitle: $Title`r`ndate: $date $time"
		if ($Categories.Length -gt 0) {
			$content = $content + "`r`ncategories:"
			foreach ($item in $Categories) {
				$item = $item.replace(" ", "-")
				$content = $content + " $item"
			}
		}
		else {
			$content = $content + "`r`n# categories: #Add categories here!"
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
if ($AddCategories -eq $false) {
	New-Post -Title $Title
}
else {
	New-Post -Title $Title -AddCategories
}